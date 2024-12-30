import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface CategoryBannerProps {
  location: string;
  category: string;
}

interface Location {
  main_location: string;
  sub_locations: string[];
}

interface Category {
  main_category: string;
  sub_categories: string[];
}

const CategoryBanner = ({ location, category }: CategoryBannerProps) => {
  const navigate = useNavigate();
  const formattedLocation = location.replace(/-/g, ' ');
  const formattedCategory = category.replace(/-/g, ' ');

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('main_location, sub_location')
        .order('main_location');
      
      if (error) throw error;

      // Group locations by main location
      const groupedLocations = data.reduce((acc: { [key: string]: string[] }, curr) => {
        if (!acc[curr.main_location]) {
          acc[curr.main_location] = [];
        }
        acc[curr.main_location].push(curr.sub_location);
        return acc;
      }, {});

      // Convert to array format
      return Object.entries(groupedLocations).map(([main, subs]) => ({
        main_location: main,
        sub_locations: subs
      }));
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category, sub_category')
        .order('main_category');
      
      if (error) throw error;

      // Group categories by main category
      const groupedCategories = data.reduce((acc: { [key: string]: string[] }, curr) => {
        if (!acc[curr.main_category]) {
          acc[curr.main_category] = [];
        }
        acc[curr.main_category].push(curr.sub_category);
        return acc;
      }, {});

      // Convert to array format
      return Object.entries(groupedCategories).map(([main, subs]) => ({
        main_category: main,
        sub_categories: subs
      }));
    }
  });

  const handleNavigate = (loc: string, cat: string) => {
    const formattedLoc = loc.toLowerCase().replace(/\s+/g, '-');
    const formattedCat = cat.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedLoc}/${formattedCat}`);
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="min-w-[200px]">
                  Change Location <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                <DropdownMenuLabel>Read more about your location and interiors products and services</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locations?.map((loc: Location) => (
                  <DropdownMenuGroup key={loc.main_location}>
                    <DropdownMenuLabel>{loc.main_location}</DropdownMenuLabel>
                    {loc.sub_locations.map((subLoc) => (
                      <DropdownMenuItem 
                        key={subLoc}
                        onClick={() => handleNavigate(`${loc.main_location}-${subLoc}`, category)}
                      >
                        {subLoc}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="min-w-[200px]">
                  Change Category <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                <DropdownMenuLabel>Read more about your location and interiors products and services</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories?.map((cat: Category) => (
                  <DropdownMenuGroup key={cat.main_category}>
                    <DropdownMenuLabel>{cat.main_category}</DropdownMenuLabel>
                    {cat.sub_categories.map((subCat) => (
                      <DropdownMenuItem 
                        key={subCat}
                        onClick={() => handleNavigate(location, subCat)}
                      >
                        {subCat}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a 
              href="https://www.findmyinteriors.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="whitespace-nowrap"
              >
                Post Free Today
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryBanner;