import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [openLocation, setOpenLocation] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const { data: locations } = useQuery({
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

      const groupedCategories = data.reduce((acc: { [key: string]: string[] }, curr) => {
        if (!acc[curr.main_category]) {
          acc[curr.main_category] = [];
        }
        acc[curr.main_category].push(curr.sub_category);
        return acc;
      }, {});

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
    setOpenLocation(false);
    setOpenCategory(false);
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
            <Popover open={openLocation} onOpenChange={setOpenLocation}>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="min-w-[200px] justify-between">
                  Change Location
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search locations..." />
                  <CommandEmpty>No location found.</CommandEmpty>
                  {locations?.map((loc) => (
                    <CommandGroup key={loc.main_location} heading={loc.main_location}>
                      {loc.sub_locations.map((subLoc) => {
                        const fullLocation = `${loc.main_location}-${subLoc}`;
                        const isActive = location === fullLocation.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <CommandItem
                            key={subLoc}
                            onSelect={() => handleNavigate(fullLocation, category)}
                            className="flex items-center justify-between"
                          >
                            {subLoc}
                            {isActive && <Check className="h-4 w-4" />}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="min-w-[200px] justify-between">
                  Change Category
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  {categories?.map((cat) => (
                    <CommandGroup key={cat.main_category} heading={cat.main_category}>
                      {cat.sub_categories.map((subCat) => {
                        const isActive = category === subCat.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <CommandItem
                            key={subCat}
                            onSelect={() => handleNavigate(location, subCat)}
                            className="flex items-center justify-between"
                          >
                            {subCat}
                            {isActive && <Check className="h-4 w-4" />}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))}
                </Command>
              </PopoverContent>
            </Popover>

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