import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting map (in-memory, resets on function restart)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60000; // 1 minute in milliseconds

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { altText, articleId } = await req.json();
    console.log(`Generating image for article ${articleId} with alt text: ${altText}`);

    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rateLimit = rateLimitMap.get(clientIp) || { count: 0, timestamp: now };

    if (now - rateLimit.timestamp > RATE_WINDOW) {
      // Reset if window has passed
      rateLimit.count = 0;
      rateLimit.timestamp = now;
    }

    if (rateLimit.count >= RATE_LIMIT) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Check if image already exists
    const { data: existingImage } = await supabase
      .from('ai_generated_images')
      .select('image_url')
      .eq('article_id', articleId)
      .eq('alt_text', altText)
      .single();

    if (existingImage) {
      console.log('Found existing image, returning cached version');
      return new Response(
        JSON.stringify({ imageUrl: existingImage.image_url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate new image
    console.log('Generating new image with DALL-E');
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

    // Store in database
    const { error: insertError } = await supabase
      .from('ai_generated_images')
      .insert({
        alt_text: altText,
        image_url: imageUrl,
        article_id: articleId
      });

    if (insertError) {
      console.error('Error storing image:', insertError);
      throw new Error('Failed to store generated image');
    }

    // Update rate limit
    rateLimit.count++;
    rateLimitMap.set(clientIp, rateLimit);

    console.log('Successfully generated and stored new image');
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