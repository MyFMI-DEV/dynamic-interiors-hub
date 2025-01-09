import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Array of image URLs to fetch and upload
    const imageUrls = [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',  // interior-1
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  // interior-2
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  // arch-1
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',  // arch-2
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',  // climate-1
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',  // climate-2
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3',  // spa-1
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154',  // spa-2
    ];

    const filenames = [
      'harrogate-interior-1.jpg',
      'harrogate-interior-2.jpg',
      'harrogate-arch-1.jpg',
      'harrogate-arch-2.jpg',
      'harrogate-climate-1.jpg',
      'harrogate-climate-2.jpg',
      'harrogate-spa-1.jpg',
      'harrogate-spa-2.jpg',
    ];

    const results = await Promise.all(
      imageUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        
        const { data, error } = await supabase.storage
          .from('article-images')
          .upload(filenames[index], blob, {
            contentType: 'image/jpeg',
            upsert: true
          });

        if (error) {
          console.error(`Error uploading ${filenames[index]}:`, error);
          return { success: false, filename: filenames[index], error };
        }

        return { success: true, filename: filenames[index], data };
      })
    );

    return new Response(
      JSON.stringify({ message: 'Images processed', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process images', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})