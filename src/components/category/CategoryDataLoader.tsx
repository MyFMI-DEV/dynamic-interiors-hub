import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CategoryDataLoaderProps {
  onCategoriesLoaded: (categories: any[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

const CategoryDataLoader = ({ onCategoriesLoaded, onLoadingChange }: CategoryDataLoaderProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('main_category, sub_category')
          .order('main_category', { ascending: true });

        if (error) throw error;

        const groupedCategories = data.reduce((acc, curr) => {
          const existingCategory = acc.find(c => c.main_category === curr.main_category);
          if (existingCategory) {
            existingCategory.sub_categories.push(curr.sub_category);
          } else {
            acc.push({
              main_category: curr.main_category,
              sub_categories: [curr.sub_category]
            });
          }
          return acc;
        }, []);

        onCategoriesLoaded(groupedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
        });
      } finally {
        onLoadingChange(false);
      }
    };

    fetchCategories();
  }, [onCategoriesLoaded, onLoadingChange, toast]);

  return null;
};

export default CategoryDataLoader;