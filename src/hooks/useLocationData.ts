import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocationData = (location: string | undefined) => {
  return useQuery({
    queryKey: ['location', location],
    queryFn: async () => {
      if (!location) return null;

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

      if (error) throw error;
      return data;
    },
    enabled: !!location,
  });
};