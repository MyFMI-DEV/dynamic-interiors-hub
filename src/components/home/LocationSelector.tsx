import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSelectorProps {
  mainLocations: string[];
  subLocations: string[];
  selectedMainLocation: string;
  setSelectedMainLocation: (location: string) => void;
  selectedSubLocation: string;
  setSelectedSubLocation: (location: string) => void;
}

const LocationSelector = ({
  mainLocations,
  subLocations,
  selectedMainLocation,
  setSelectedMainLocation,
  selectedSubLocation,
  setSelectedSubLocation,
}: LocationSelectorProps) => {
  return (
    <>
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
    </>
  );
};

export default LocationSelector;