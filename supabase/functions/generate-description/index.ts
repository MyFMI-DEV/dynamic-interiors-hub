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
    console.log(`Generating description for ${location}/${category}`);
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if description already exists
    const { data: existingDescription, error: fetchError } = await supabase
      .from('location_category_descriptions')
      .select('description')
      .eq('location', location?.toLowerCase())
      .eq('category', category?.toLowerCase())
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching existing description:', fetchError);
      throw fetchError;
    }

    if (existingDescription) {
      console.log('Returning existing description');
      return new Response(
        JSON.stringify({ description: existingDescription.description }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new description using OpenAI
    console.log('Generating new description using OpenAI');
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
            content: `You are an expert interior design consultant providing clear, direct information about local markets and design trends. 
            Use straightforward, professional language. Avoid flowery or colloquial terms like "nestled," "scene," or similar descriptive phrases.
            Focus on facts, specific services, and practical information. Your tone should be professional and direct while remaining helpful.`
          },
          {
            role: 'user',
            content: `Write a clear, direct description about ${category} services and products in ${location}. 
            Include:
            1. A direct introduction to ${category} services in ${location}
            2. Current trends in ${location}
            3. How local requirements influence ${category} choices
            4. Practical advice for people considering ${category} services
            5. Specific benefits of ${location}'s ${category} services
            
            Keep it under 400 words, use straightforward language, and focus on practical information.`
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Failed to generate description from OpenAI');
    }

    const generatedDescription = data.choices[0].message.content;

    // Store the generated description
    const { error: insertError } = await supabase
      .from('location_category_descriptions')
      .insert([
        {
          location: location?.toLowerCase(),
          category: category?.toLowerCase(),
          description: generatedDescription,
        }
      ]);

    if (insertError) {
      console.error('Error inserting description:', insertError);
      throw insertError;
    }

    console.log('Description generated and stored successfully');
    return new Response(
      JSON.stringify({ description: generatedDescription }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-description function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});