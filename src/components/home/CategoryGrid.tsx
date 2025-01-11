import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const CategoryGrid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMainLocation, setSelectedMainLocation] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories } = useQuery({
    queryKey: ['mainCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category')
        .order('main_category');
      
      if (error) throw error;
      
      const uniqueCategories = [...new Set(data.map(c => c.main_category))];
      return uniqueCategories;
    }
  });

  const { data: locations } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('main_location, sub_location')
        .order('main_location');
      
      if (error) throw error;
      return data;
    }
  });

  const { data: subCategories } = useQuery({
    queryKey: ['subCategories', selectedCategory],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('sub_category')
        .eq('main_category', selectedCategory);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedCategory
  });

  const mainLocations = [...new Set(locations?.map(l => l.main_location) || [])];
  const subLocations = locations?.filter(l => l.main_location === selectedMainLocation).map(l => l.sub_location) || [];

  const handleSearch = () => {
    if (selectedMainLocation && selectedSubLocation && selectedCategory) {
      const locationPath = `${selectedMainLocation.toLowerCase()}-${selectedSubLocation.toLowerCase()}`.replace(/\s+/g, '-');
      const categoryPath = selectedCategory.toLowerCase().replace(/\s+/g, '-');
      navigate(`/${locationPath}/${categoryPath}`);
      toast({
        title: "Location Selected",
        description: `Browsing ${selectedCategory} in ${selectedMainLocation} - ${selectedSubLocation}`,
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/london/${category.toLowerCase().replace(/\s+/g, '-')}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} products and services in London.`,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Interior & Home Categories
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Explore our comprehensive range of interior design and home improvement categories
        </p>

        <Card className="p-6 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Search Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Main Location</label>
              <Select onValueChange={setSelectedMainLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main location" />
                </SelectTrigger>
                <SelectContent>
                  {mainLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sub Location</label>
              <Select 
                onValueChange={setSelectedSubLocation}
                disabled={!selectedMainLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub location" />
                </SelectTrigger>
                <SelectContent>
                  {subLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedCategory && (
            <p className="text-sm text-muted-foreground mb-6">
              Read more about {selectedCategory} in your location
            </p>
          )}
          <Button 
            onClick={handleSearch}
            disabled={!selectedMainLocation || !selectedSubLocation || !selectedCategory}
            className="w-full"
          >
            Search
          </Button>
        </Card>
        
        <div className="relative w-full max-w-[95vw] mx-auto px-4 md:px-8">
          <Carousel 
            className="w-full" 
            opts={{ 
              align: "start",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps"
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories?.map((category) => (
                <CarouselItem 
                  key={category} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card 
                    className="group p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary/80 transition-colors">
                        {category}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        Find quality {category.toLowerCase()} products and trusted service providers in your area.
                      </p>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/80 text-primary font-semibold">
                      Browse {category}
                    </Button>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;