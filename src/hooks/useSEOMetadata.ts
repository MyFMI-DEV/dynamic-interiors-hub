import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SEOMetadata {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

export const useSEOMetadata = (location: string | undefined, category: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['seo', location, category],
    queryFn: async () => {
      try {
        // First try to get existing SEO metadata
        const { data: existingSEO, error: fetchError } = await supabase
          .from('seo_metadata')
          .select('*')
          .eq('location', location?.toLowerCase())
          .eq('category', category?.toLowerCase())
          .maybeSingle();

        if (fetchError) {
          toast({
            title: "Error fetching SEO metadata",
            description: fetchError.message,
            variant: "destructive",
          });
          throw fetchError;
        }

        if (existingSEO) {
          return existingSEO as SEOMetadata;
        }

        // If no existing SEO metadata, generate new one
        const { data, error } = await supabase.functions.invoke('generate-seo', {
          body: { location, category }
        });

        if (error) {
          toast({
            title: "Error generating SEO metadata",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }

        return data as SEOMetadata;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load SEO metadata. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!location && !!category,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
  });
};