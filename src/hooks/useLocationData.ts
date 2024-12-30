import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocationData = (location: string | undefined) => {
  return useQuery({
    queryKey: ['location', location],
    queryFn: async () => {
      if (!location) {
        console.log('No location provided to useLocationData');
        return null;
      }

      console.log('Fetching location data for:', location);

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
        console.error('Error fetching location data:', error);
        throw error;
      }

      console.log('Location data result:', data);
      return data;
    },
    retry: 1,
    enabled: !!location,
  });
};