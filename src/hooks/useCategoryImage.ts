import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCategoryImage = (category: string | undefined) => {
  return useQuery({
    queryKey: ['categoryImage', category],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('generate-category-image', {
        body: { category }
      });

      if (error) throw error;
      return data.imageUrl;
    },
    enabled: !!category,
    staleTime: Infinity, // Cache the image URL indefinitely since it's expensive to generate
    cacheTime: Infinity, // Never remove from cache
  });
};