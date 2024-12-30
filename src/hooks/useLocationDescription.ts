import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLocationDescription = (location: string | undefined, category: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['description', location, category],
    queryFn: async () => {
      try {
        // First try to get existing description
        const { data: existingDescription, error: fetchError } = await supabase
          .from('location_category_descriptions')
          .select('description')
          .eq('location', location?.toLowerCase())
          .eq('category', category?.toLowerCase())
          .maybeSingle();

        if (fetchError) {
          toast({
            title: "Error fetching description",
            description: fetchError.message,
            variant: "destructive",
          });
          throw fetchError;
        }

        if (existingDescription) {
          return existingDescription.description;
        }

        // If no existing description, generate new one
        const { data, error } = await supabase.functions.invoke('generate-description', {
          body: { location, category }
        });

        if (error) {
          toast({
            title: "Error generating description",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }

        return data.description;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load location description. Please try again later.",
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