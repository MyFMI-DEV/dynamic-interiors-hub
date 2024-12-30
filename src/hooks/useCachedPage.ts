import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface CachedContent {
  description: string;
  seoMetadata: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  categoryImage: string;
}

type DatabaseCachedPage = {
  id: string;
  location: string;
  category: string;
  content: Json;
  last_updated: string;
}

export const useCachedPage = (location: string, category: string) => {
  return useQuery({
    queryKey: ['cached-page', location, category],
    queryFn: async () => {
      console.log('Checking for cached data:', location, category);
      
      const { data, error } = await supabase
        .from('cached_pages')
        .select('*')
        .eq('location', location?.toLowerCase())
        .eq('category', category?.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        console.log('Found cached data:', data);
        const typedData = data as DatabaseCachedPage;
        return typedData.content as unknown as CachedContent;
      }
      console.log('No cached data found');
      return null;
    },
  });
};