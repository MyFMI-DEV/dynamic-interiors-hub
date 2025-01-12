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

      if (!article?.image_url) {
        console.log('No image found for article:', articleId);
        return null;
      }

      // Clean up the URL to ensure it's in the correct format
      const imageUrl = article.image_url.startsWith('/lovable-uploads')
        ? article.image_url
        : `/lovable-uploads/${article.image_url.split('/lovable-uploads/').pop()}`;

      console.log('Processed image URL:', imageUrl);
      return imageUrl;
    },
    retry: 1,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};