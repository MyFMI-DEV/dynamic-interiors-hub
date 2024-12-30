import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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
        JSON.stringify(existingSEO),
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
            content: 'You are an SEO expert that generates metadata for interior design services and products pages.'
          },
          {
            role: 'user',
            content: `Generate SEO metadata for a page about ${category} interior design services/products in ${location}. Include a title (max 60 chars), meta description (max 160 chars), and 5-7 relevant keywords. Format as JSON with keys: metaTitle, metaDescription, keywords (array).`
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Failed to generate SEO metadata from OpenAI');
    }

    const seoData = JSON.parse(data.choices[0].message.content);

    // Store the generated SEO metadata
    const { error: insertError } = await supabase
      .from('seo_metadata')
      .insert([
        {
          location: location?.toLowerCase(),
          category: category?.toLowerCase(),
          meta_title: seoData.metaTitle,
          meta_description: seoData.metaDescription,
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