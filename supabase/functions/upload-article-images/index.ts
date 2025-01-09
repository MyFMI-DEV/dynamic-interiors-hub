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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  // interior-1
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  // interior-2
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',  // arch-1
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',  // arch-2
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',  // climate-1
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',  // climate-2
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3',  // spa-1
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154',  // spa-2
      'https://images.unsplash.com/photo-1600585154526-73a73847bdb7',  // eco-1
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',  // eco-2
      'https://images.unsplash.com/photo-1600566752355-35792b24c7f8',  // luxury-1
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  // luxury-2
      'https://images.unsplash.com/photo-1600607687166-48ad73805ab3',  // architect-1
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',  // architect-2
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  // trend-1
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',  // trend-2
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',  // planning-1
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  // planning-2
      'https://images.unsplash.com/photo-1600607687166-48ad73805ab3',  // renovation-1
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',  // renovation-2
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',  // culture-1
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',  // culture-2
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',  // future-1
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',  // future-2
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
      'harrogate-eco-1.jpg',
      'harrogate-eco-2.jpg',
      'harrogate-luxury-1.jpg',
      'harrogate-luxury-2.jpg',
      'harrogate-architect-1.jpg',
      'harrogate-architect-2.jpg',
      'harrogate-trend-1.jpg',
      'harrogate-trend-2.jpg',
      'harrogate-planning-1.jpg',
      'harrogate-planning-2.jpg',
      'harrogate-renovation-1.jpg',
      'harrogate-renovation-2.jpg',
      'harrogate-culture-1.jpg',
      'harrogate-culture-2.jpg',
      'harrogate-future-1.jpg',
      'harrogate-future-2.jpg',
    ];

    const results = await Promise.all(
      imageUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        
        const { data, error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(filenames[index], blob, {
            contentType: 'image/jpeg',
            upsert: true
          })

        if (uploadError) {
          console.error(`Error uploading ${filenames[index]}:`, uploadError);
          return { success: false, filename: filenames[index], error: uploadError };
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