import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import SearchableDropdown from "./SearchableDropdown";
import PostButton from "./PostButton";

interface CategoryBannerProps {
  location: string;
  category: string;
}

const CategoryBanner = ({ location, category }: CategoryBannerProps) => {
  const navigate = useNavigate();
  const formattedLocation = location.replace(/-/g, ' ');
  const formattedCategory = category.replace(/-/g, ' ');

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

  const handleLocationSelect = (loc: string) => {
    const formattedLoc = loc.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedLoc}/${category}`);
  };

  const handleCategorySelect = (cat: string) => {
    const formattedCat = cat.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${location}/${formattedCat}`);
  };

  return (
    <Card className="bg-primary text-white p-6 mb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg max-w-2xl">
            Looking for {formattedCategory} in{" "}
            <span className="font-bold">{formattedLocation}</span>?
            Post an image, URL, or description free today to find the best deals from Interiors experts in your area!
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchableDropdown
              title="Change Location"
              groups={locations || []}
              value={location}
              onSelect={handleLocationSelect}
              isLoading={isLoadingLocations}
            />
            <SearchableDropdown
              title="Change Category"
              groups={categories || []}
              value={category}
              onSelect={handleCategorySelect}
              isLoading={isLoadingCategories}
            />
            <PostButton />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryBanner;