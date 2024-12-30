import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SEOMetadata {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export const useSEOMetadata = (location: string | undefined, category: string | undefined) => {
  return useQuery({
    queryKey: ['seo', location, category],
    queryFn: async () => {
      // First try to get existing SEO metadata
      const { data: existingSEO } = await supabase
        .from('seo_metadata')
        .select('*')
        .eq('location', location?.toLowerCase())
        .eq('category', category?.toLowerCase())
        .maybeSingle();

      if (existingSEO) {
        return existingSEO as SEOMetadata;
      }

      // If no existing SEO metadata, generate new one
      const { data, error } = await supabase.functions.invoke('generate-seo', {
        body: { location, category }
      });

      if (error) throw error;
      return data as SEOMetadata;
    },
    enabled: !!location && !!category,
  });
};