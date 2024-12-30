import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface SEOMetadata {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

interface CachedContent {
  description: string;
  seoMetadata: SEOMetadata;
  categoryImage: string;
}

type DatabaseCachedPage = {
  id: string;
  location: string;
  category: string;
  content: Json;
  last_updated: string;
}

export const useCachedPage = (location: string | undefined, category: string | undefined) => {
  return useQuery({
    queryKey: ['cached-page', location, category],
    queryFn: async () => {
      if (!location || !category) return null;
      
      const { data, error } = await supabase
        .from('cached_pages')
        .select('*')
        .eq('location', location.toLowerCase())
        .eq('category', category.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        const typedData = data as DatabaseCachedPage;
        return typedData.content as unknown as CachedContent;
      }
      return null;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 60, // Keep in garbage collection for 1 hour
  });
};