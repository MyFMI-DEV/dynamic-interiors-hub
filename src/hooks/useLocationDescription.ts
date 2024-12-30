import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocationDescription = (location: string | undefined, category: string | undefined) => {
  return useQuery({
    queryKey: ['description', location, category],
    queryFn: async () => {
      // First try to get existing description
      const { data: existingDescription } = await supabase
        .from('location_category_descriptions')
        .select('description')
        .eq('location', location?.toLowerCase())
        .eq('category', category?.toLowerCase())
        .maybeSingle();

      if (existingDescription) {
        return existingDescription.description;
      }

      // If no existing description, generate new one
      const { data, error } = await supabase.functions.invoke('generate-description', {
        body: { location, category }
      });

      if (error) throw error;
      return data.description;
    },
    enabled: !!location && !!category,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
};