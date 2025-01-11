import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { altText, articleId } = await req.json();
    console.log(`Generating image for article ${articleId} with alt text: ${altText}`);

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Supabase environment variables are not configured');
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Check if image already exists
    const { data: existingImage } = await supabase
      .from('ai_generated_images')
      .select('image_url')
      .eq('article_id', articleId)
      .eq('alt_text', altText)
      .single();

    if (existingImage?.image_url) {
      console.log('Image already exists:', existingImage.image_url);
      return new Response(
        JSON.stringify({ imageUrl: existingImage.image_url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new image
    console.log('Calling DALL-E API');
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `A professional, modern image representing ${altText}. Style: minimalist and elegant. Context: interior design and home decoration.`,
        n: 1,
        size: "1024x1024",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    console.log('Successfully generated image URL:', imageUrl);

    // Insert the image URL into the database using service role
    const { error: insertError } = await supabase
      .from('ai_generated_images')
      .insert({
        article_id: articleId,
        alt_text: altText,
        image_url: imageUrl
      });

    if (insertError) {
      console.error('Error inserting image into database:', insertError);
      throw new Error('Failed to save image URL to database');
    }

    console.log('Successfully saved image URL to database');

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-article-image function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});