import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLocationData = (location: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['location', location],
    queryFn: async () => {
      if (!location) return null;

      try {
        // Split location into main and sub location
        const parts = location.split('-');
        const mainLocation = parts[0];
        const subLocation = parts.slice(1).join(' ');

        const { data, error } = await supabase
          .from('locations')
          .select('id')
          .eq('main_location', mainLocation)
          .eq('sub_location', subLocation)
          .maybeSingle();

        if (error) {
          toast({
            title: "Error loading location data",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }

        return data;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load location data. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
};