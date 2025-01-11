import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      console.log('Generating image for:', { articleId, altText });
      
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
      return generatedData.imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};