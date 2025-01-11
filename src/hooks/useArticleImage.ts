import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      // First try to fetch from cache
      const { data: existingImage } = await supabase
        .from('ai_generated_images')
        .select('image_url')
        .eq('article_id', articleId)
        .eq('alt_text', altText)
        .single();

      if (existingImage) {
        return existingImage.image_url;
      }

      // If not found, generate new image
      const { data, error } = await supabase.functions.invoke('generate-article-image', {
        body: { articleId, altText }
      });

      if (error) throw error;
      return data.imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};