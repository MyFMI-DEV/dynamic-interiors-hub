import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import LocationSelector from "./LocationSelector";
import CategorySelector from "./CategorySelector";
import CategoryCarousel from "./CategoryCarousel";

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
            <LocationSelector
              mainLocations={mainLocations}
              subLocations={subLocations}
              selectedMainLocation={selectedMainLocation}
              setSelectedMainLocation={setSelectedMainLocation}
              selectedSubLocation={selectedSubLocation}
              setSelectedSubLocation={setSelectedSubLocation}
            />
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
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
        
        <CategoryCarousel 
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </section>
  );
};

export default CategoryGrid;