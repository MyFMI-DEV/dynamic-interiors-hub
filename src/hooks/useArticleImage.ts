import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      // First try to fetch from cache
      const { data: existingImage, error } = await supabase
        .from('ai_generated_images')
        .select('image_url')
        .eq('article_id', articleId)
        .eq('alt_text', altText)
        .single();

      if (error) {
        console.log('Error fetching cached image:', error);
      }

      if (existingImage?.image_url) {
        return existingImage.image_url;
      }

      // If not found, generate new image
      const { data, error: functionError } = await supabase.functions.invoke('generate-article-image', {
        body: { articleId, altText }
      });

      if (functionError) throw functionError;
      return data.imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};