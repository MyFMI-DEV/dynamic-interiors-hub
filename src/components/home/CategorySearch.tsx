import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySearchProps {
  mainLocations: string[];
  subLocations: string[];
  categories: string[] | undefined;
  selectedMainLocation: string;
  selectedSubLocation: string;
  selectedCategory: string;
  onMainLocationChange: (value: string) => void;
  onSubLocationChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const CategorySearch = ({
  mainLocations,
  subLocations,
  categories,
  selectedMainLocation,
  selectedSubLocation,
  selectedCategory,
  onMainLocationChange,
  onSubLocationChange,
  onCategoryChange,
}: CategorySearchProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <Card className="p-6 mb-12">
      <h3 className="text-2xl font-semibold mb-6">Search Locations</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Main Location</label>
          <Select onValueChange={onMainLocationChange}>
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
            onValueChange={onSubLocationChange}
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
          <Select onValueChange={onCategoryChange}>
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
  );
};

export default CategorySearch;