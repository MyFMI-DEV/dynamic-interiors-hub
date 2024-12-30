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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if description already exists
    const { data: existingDescription } = await supabase
      .from('location_category_descriptions')
      .select('description')
      .eq('location', location)
      .eq('category', category)
      .single();

    if (existingDescription) {
      return new Response(
        JSON.stringify({ description: existingDescription.description }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new description
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
            content: 'You are a helpful assistant that generates informative descriptions about interior design services and products in specific locations.'
          },
          {
            role: 'user',
            content: `Write a detailed but concise description about ${category} services/products in ${location}. Focus on the local market, trends, and what makes this category special in this location. Keep it under 300 words.`
          }
        ],
      }),
    });

    const data = await response.json();
    const generatedDescription = data.choices[0].message.content;

    // Store the generated description
    await supabase
      .from('location_category_descriptions')
      .insert([
        {
          location,
          category,
          description: generatedDescription,
        }
      ]);

    return new Response(
      JSON.stringify({ description: generatedDescription }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});