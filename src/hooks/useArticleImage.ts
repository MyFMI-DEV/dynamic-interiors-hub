import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      console.log('Fetching image for:', { articleId, altText });
      
      const { data: article, error: fetchError } = await supabase
        .from('articles')
        .select('image_url')
        .eq('id', articleId)
        .single();

      if (fetchError) {
        console.error('Error fetching article image:', fetchError);
        throw fetchError;
      }

      if (!article?.image_url) {
        console.log('No image found for article:', articleId);
        return null;
      }

      return article.image_url;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};