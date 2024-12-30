import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface LocationGroup {
  heading: string;
  items: string[];
}

export const useLocationCategories = () => {
  const { data: locations, isLoading: isLoadingLocations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('main_location, sub_location')
        .order('main_location');
      
      if (error) throw error;

      const groupedLocations = data.reduce((acc: { [key: string]: string[] }, curr) => {
        if (!acc[curr.main_location]) {
          acc[curr.main_location] = [];
        }
        acc[curr.main_location].push(curr.sub_location);
        return acc;
      }, {});

      return Object.entries(groupedLocations).map(([main, subs]) => ({
        heading: main,
        items: subs
      }));
    }
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category, sub_category')
        .order('main_category');
      
      if (error) throw error;

      const groupedCategories = data.reduce((acc: { [key: string]: string[] }, curr) => {
        if (!acc[curr.main_category]) {
          acc[curr.main_category] = [];
        }
        acc[curr.main_category].push(curr.sub_category);
        return acc;
      }, {});

      return Object.entries(groupedCategories).map(([main, subs]) => ({
        heading: main,
        items: subs
      }));
    }
  });

  return {
    locations,
    categories,
    isLoadingLocations,
    isLoadingCategories
  };
};