import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocationData = (location: string | undefined) => {
  return useQuery({
    queryKey: ['location', location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('id')
        .eq('main_location', location)
        .eq('sub_location', 'City Centre')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!location,
  });
};