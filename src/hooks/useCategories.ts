import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  main_category: string;
  sub_categories: string[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category, sub_category')
        .order('main_category');
      
      if (error) throw error;

      // Group categories by main category
      const groupedCategories = data.reduce((acc: Category[], curr) => {
        const existingCategory = acc.find(c => c.main_category === curr.main_category);
        if (existingCategory) {
          existingCategory.sub_categories.push(curr.sub_category);
        } else {
          acc.push({
            main_category: curr.main_category,
            sub_categories: [curr.sub_category],
          });
        }
        return acc;
      }, []);

      return groupedCategories;
    },
  });
};