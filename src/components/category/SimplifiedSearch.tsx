import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SimplifiedSearchProps {
  locations: { heading: string; items: string[] }[];
  categories: { heading: string; items: string[] }[];
  currentLocation: string;
  currentCategory: string;
}

const SimplifiedSearch = ({ 
  locations, 
  categories, 
  currentLocation, 
  currentCategory 
}: SimplifiedSearchProps) => {
  const navigate = useNavigate();
  const [selectedMainLocation, setSelectedMainLocation] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleLocationChange = (subLocation: string) => {
    const formattedLocation = subLocation.toLowerCase().replace(/\s+/g, '-');
    const formattedCategory = selectedSubCategory || currentCategory;
    navigate(`/${formattedLocation}/${formattedCategory}`);
  };

  const handleCategoryChange = (subCategory: string) => {
    const formattedCategory = subCategory.toLowerCase().replace(/\s+/g, '-');
    const formattedLocation = selectedSubLocation.toLowerCase().replace(/\s+/g, '-') || currentLocation;
    navigate(`/${formattedLocation}/${formattedCategory}`);
  };

  return (
    <Card className="p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-6">Search Locations & Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location</h3>
          <Select onValueChange={setSelectedMainLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select main location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.heading} value={location.heading}>
                  {location.heading}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedMainLocation && (
            <Select onValueChange={handleLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sub location" />
              </SelectTrigger>
              <SelectContent>
                {locations
                  .find((loc) => loc.heading === selectedMainLocation)
                  ?.items.map((subLocation) => (
                    <SelectItem key={subLocation} value={subLocation}>
                      {subLocation}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Category</h3>
          <Select onValueChange={setSelectedMainCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select main category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.heading} value={category.heading}>
                  {category.heading}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedMainCategory && (
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select sub category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .find((cat) => cat.heading === selectedMainCategory)
                  ?.items.map((subCategory) => (
                    <SelectItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SimplifiedSearch;