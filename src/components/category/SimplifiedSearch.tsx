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
  currentLocation, 
  currentCategory 
}: SimplifiedSearchProps) => {
  const navigate = useNavigate();
  const [selectedMainLocation, setSelectedMainLocation] = useState("");

  const handleLocationChange = (subLocation: string) => {
    const formattedLocation = subLocation.toLowerCase().replace(/\s+/g, '-');
    const formattedCategory = currentCategory;
    navigate(`/${formattedLocation}/${formattedCategory}`);
  };

  return (
    <Card className="p-6 mt-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Search Locations</h2>
          <p className="text-muted-foreground mb-4">
            Read more about {currentCategory.replace(/-/g, ' ')} in your location
          </p>
        </div>

        <div className="space-y-4">
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
      </div>
    </Card>
  );
};

export default SimplifiedSearch;