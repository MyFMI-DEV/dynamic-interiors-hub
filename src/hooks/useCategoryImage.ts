import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useCategoryImage = (category: string | undefined) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['categoryImage', category],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-category-image', {
          body: { category }
        });

        if (error) {
          toast({
            title: "Error loading category image",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }
        return data.imageUrl;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load category image. Please try again later.",
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled: !!category,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
  });
};