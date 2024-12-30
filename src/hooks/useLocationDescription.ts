import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocationDescription = (location: string | undefined, category: string | undefined) => {
  return useQuery({
    queryKey: ['description', location, category],
    queryFn: async () => {
      if (!location || !category) {
        console.log('Missing location or category in useLocationDescription:', { location, category });
        return null;
      }

      console.log('Fetching description for:', { location, category });

      // First try to get existing description
      const { data: existingDescription, error: fetchError } = await supabase
        .from('location_category_descriptions')
        .select('description')
        .eq('location', location.toLowerCase())
        .eq('category', category.toLowerCase())
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching description:', fetchError);
        throw fetchError;
      }

      if (existingDescription) {
        console.log('Found existing description');
        return existingDescription.description;
      }

      console.log('No existing description, generating new one');
      // If no existing description, generate new one
      const { data, error } = await supabase.functions.invoke('generate-description', {
        body: { location, category }
      });

      if (error) {
        console.error('Error generating description:', error);
        throw error;
      }

      console.log('Generated new description');
      return data.description;
    },
    retry: 1,
    enabled: !!location && !!category,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });
};