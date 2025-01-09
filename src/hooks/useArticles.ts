import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data: articles, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_faqs (*),
          article_locations (*),
          article_categories (*)
        `)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return articles;
    }
  });
};