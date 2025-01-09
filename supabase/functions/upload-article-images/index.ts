import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('Edge Function started');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting image upload process');
    console.log('Supabase URL:', Deno.env.get('SUPABASE_URL'));
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Supabase client initialized');

    // Test Supabase connection
    const { data: testData, error: testError } = await supabase
      .from('articles')
      .select('id')
      .limit(1);

    if (testError) {
      console.error('Supabase connection test failed:', testError);
      throw new Error('Failed to connect to Supabase');
    }
    console.log('Supabase connection test successful');

    const imageUrls = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154',
      'https://images.unsplash.com/photo-1600585154526-73a73847bdb7',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',
      'https://images.unsplash.com/photo-1600566752355-35792b24c7f8',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687166-48ad73805ab3',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600607687166-48ad73805ab3',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ]

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
      'harrogate-future-2.jpg'
    ]

    console.log(`Starting to process ${imageUrls.length} images`);
    
    const results = await Promise.all(
      imageUrls.map(async (url, index) => {
        try {
          console.log(`[${index + 1}/${imageUrls.length}] Fetching image from ${url}`);
          const response = await fetch(`${url}?w=1200&q=80`);
          
          if (!response.ok) {
            console.error(`Failed to fetch image ${index + 1}: ${response.statusText}`);
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          }
          
          const blob = await response.blob();
          console.log(`Successfully fetched image ${index + 1}/${imageUrls.length} (${blob.size} bytes)`);
          
          console.log(`Uploading ${filenames[index]} to storage`);
          const { data, error: uploadError } = await supabase.storage
            .from('article-images')
            .upload(filenames[index], blob, {
              contentType: 'image/jpeg',
              upsert: true
            });

          if (uploadError) {
            console.error(`Error uploading ${filenames[index]}:`, uploadError);
            return { success: false, filename: filenames[index], error: uploadError };
          }

          // Get the public URL for the uploaded image
          const { data: { publicUrl } } = supabase.storage
            .from('article-images')
            .getPublicUrl(filenames[index]);

          console.log(`Successfully uploaded ${filenames[index]} to ${publicUrl}`);
          return { 
            success: true, 
            filename: filenames[index], 
            publicUrl,
            data 
          };
        } catch (error) {
          console.error(`Error processing ${url}:`, error);
          return { success: false, filename: filenames[index], error: error.message };
        }
      })
    );

    console.log('Finished processing all images');
    
    // Insert image records into the article_images table
    const successfulUploads = results.filter(result => result.success);
    console.log(`${successfulUploads.length} successful uploads out of ${results.length} total`);
    
    for (const upload of successfulUploads) {
      console.log(`Inserting record for ${upload.filename} into article_images table`);
      const { error: dbError } = await supabase
        .from('article_images')
        .insert({
          url: upload.publicUrl,
          alt: upload.filename.split('.')[0].replace(/-/g, ' '),
          article_id: '00000000-0000-0000-0000-000000000000' // Placeholder ID
        });

      if (dbError) {
        console.error(`Error inserting image record for ${upload.filename}:`, dbError);
      } else {
        console.log(`Successfully inserted record for ${upload.filename}`);
      }
    }

    console.log('All operations completed successfully');
    return new Response(
      JSON.stringify({ 
        message: 'Images processed', 
        results,
        successCount: successfulUploads.length,
        totalCount: results.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process images', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});