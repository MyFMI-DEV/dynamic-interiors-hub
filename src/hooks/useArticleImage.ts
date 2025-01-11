import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      console.log('Fetching image for:', { articleId, altText });
      
      const { data: existingImage, error: cacheError } = await supabase
        .from('ai_generated_images')
        .select('image_url')
        .eq('article_id', articleId)
        .eq('alt_text', altText)
        .single();

      if (cacheError) {
        console.log('Cache miss or error:', cacheError.message);
      }

      if (existingImage?.image_url) {
        console.log('Found cached image:', existingImage.image_url);
        return existingImage.image_url;
      }

      console.log('No cached image found, generating new one...');

      const { data: generatedData, error: functionError } = await supabase.functions.invoke<{ imageUrl: string }>('generate-article-image', {
        body: { altText, articleId }
      });

      if (functionError) {
        console.error('Edge function error:', functionError);
        throw new Error('Failed to generate image');
      }

      if (!generatedData?.imageUrl) {
        console.error('No image URL returned from edge function');
        throw new Error('No image URL returned');
      }

      console.log('Successfully generated image:', generatedData.imageUrl);

      const { error: insertError } = await supabase
        .from('ai_generated_images')
        .insert({
          article_id: articleId,
          alt_text: altText,
          image_url: generatedData.imageUrl
        });

      if (insertError) {
        console.error('Failed to cache generated image:', insertError);
      }

      return generatedData.imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};