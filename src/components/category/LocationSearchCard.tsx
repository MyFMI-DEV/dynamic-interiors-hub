import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchCardProps {
  currentCategory: string;
}

const LocationSearchCard = ({ currentCategory }: LocationSearchCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMainLocation, setSelectedMainLocation] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");

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
    if (selectedMainLocation && selectedSubLocation) {
      const locationPath = `${selectedMainLocation.toLowerCase()}-${selectedSubLocation.toLowerCase()}`.replace(/\s+/g, '-');
      navigate(`/${locationPath}/${currentCategory}`);
      toast({
        title: "Location Selected",
        description: `Browsing ${currentCategory} in ${selectedMainLocation} - ${selectedSubLocation}`,
      });
    }
  };

  return (
    <Card className="p-6 mb-8">
      <h3 className="text-2xl font-semibold mb-6">Search Locations</h3>
      <p className="text-muted-foreground mb-6">
        Read more about {currentCategory} in your location
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
      </div>
      <Button 
        onClick={handleSearch}
        disabled={!selectedMainLocation || !selectedSubLocation}
        className="w-full"
      >
        Search
      </Button>
    </Card>
  );
};

export default LocationSearchCard;