import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      console.log('Fetching image for:', { articleId, altText });
      
      // Fetch the image URL directly from the articles table
      const { data: article, error: fetchError } = await supabase
        .from('articles')
        .select('image_url')
        .eq('id', articleId)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching article image:', fetchError);
        throw fetchError;
      }

      if (article?.image_url) {
        console.log('Found existing image:', article.image_url);
        return article.image_url;
      }

      console.log('No image found, generating new one...');

      // If no image exists, generate a new one
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

      // Update the article with the new image URL
      const { error: updateError } = await supabase
        .from('articles')
        .update({ image_url: generatedData.imageUrl })
        .eq('id', articleId);

      if (updateError) {
        console.error('Failed to update article with new image:', updateError);
        // Don't throw here, we still want to return the image URL
      }

      return generatedData.imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};