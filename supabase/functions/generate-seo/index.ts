import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from '@supabase/supabase-js';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, category } = await req.json();
    console.log(`Generating SEO metadata for ${location}/${category}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if SEO metadata already exists
    const { data: existingSEO, error: fetchError } = await supabase
      .from('seo_metadata')
      .select('*')
      .eq('location', location?.toLowerCase())
      .eq('category', category?.toLowerCase())
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching existing SEO metadata:', fetchError);
      throw fetchError;
    }

    if (existingSEO) {
      console.log('Returning existing SEO metadata');
      return new Response(
        JSON.stringify({
          meta_title: existingSEO.meta_title,
          meta_description: existingSEO.meta_description,
          keywords: existingSEO.keywords,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new SEO metadata using OpenAI
    console.log('Generating new SEO metadata using OpenAI');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an SEO expert. Generate metadata in JSON format with these fields: meta_title (max 60 chars), meta_description (max 160 chars), and keywords (array of 5-7 relevant terms).'
          },
          {
            role: 'user',
            content: `Generate SEO metadata for ${category} interior design services/products in ${location}.`
          }
        ],
        temperature: 0.7,
      }),
    });

    const openAIData = await response.json();
    console.log('OpenAI response received:', openAIData);
    
    if (!openAIData.choices?.[0]?.message?.content) {
      throw new Error('Failed to generate SEO metadata from OpenAI');
    }

    let seoData;
    try {
      // Extract the JSON object from the response, handling potential markdown formatting
      const content = openAIData.choices[0].message.content;
      const jsonStr = content.replace(/```json\n|\n```/g, '').trim();
      seoData = JSON.parse(jsonStr);
      
      // Validate the required fields
      if (!seoData.meta_title || !seoData.meta_description || !Array.isArray(seoData.keywords)) {
        throw new Error('Invalid SEO data structure');
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to parse SEO metadata from OpenAI response');
    }

    // Store the generated SEO metadata
    const { error: insertError } = await supabase
      .from('seo_metadata')
      .insert([
        {
          location: location?.toLowerCase(),
          category: category?.toLowerCase(),
          meta_title: seoData.meta_title,
          meta_description: seoData.meta_description,
          keywords: seoData.keywords,
        }
      ]);

    if (insertError) {
      console.error('Error inserting SEO metadata:', insertError);
      throw insertError;
    }

    console.log('SEO metadata generated and stored successfully');
    return new Response(
      JSON.stringify(seoData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-seo function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});