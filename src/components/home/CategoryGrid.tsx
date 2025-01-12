import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CategoryHeader from './CategoryHeader';
import CategorySearch from './CategorySearch';
import CategoryCarousel from './CategoryCarousel';

const CategoryGrid = () => {
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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <CategoryHeader />
        
        <CategorySearch 
          mainLocations={mainLocations}
          subLocations={subLocations}
          categories={categories}
          selectedMainLocation={selectedMainLocation}
          selectedSubLocation={selectedSubLocation}
          selectedCategory={selectedCategory}
          onMainLocationChange={setSelectedMainLocation}
          onSubLocationChange={setSelectedSubLocation}
          onCategoryChange={setSelectedCategory}
        />
        
        <CategoryCarousel categories={categories} />
      </div>
    </section>
  );
};

export default CategoryGrid;