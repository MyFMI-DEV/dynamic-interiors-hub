import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocationData } from "@/hooks/useLocationData";
import LocationCategoryHeader from "@/components/category/LocationCategoryHeader";
import LocationCategoryLayout from "@/components/category/LocationCategoryLayout";
import MainContent from "@/components/category/MainContent";
import { Skeleton } from "@/components/ui/skeleton";

const LocationCategory = () => {
  const { location, category } = useParams();
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");

  useEffect(() => {
    if (location) {
      const parts = location.split('-');
      const mainLoc = parts[0];
      const subLoc = parts.slice(1).join(' ');
      setMainLocation(mainLoc);
      setSubLocation(subLoc);
    }
  }, [location]);

  const { isLoading: isLoadingLocation } = useLocationData(location);

  if (!location || !category) {
    return <div>404 - Page not found</div>;
  }

  return (
    <LocationCategoryLayout>
      <LocationCategoryHeader
        mainLocation={mainLocation}
        subLocation={subLocation}
        location={location}
        category={category}
      />

      {isLoadingLocation ? (
        <div className="mt-8">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="mt-8">
          <MainContent location={location} category={category} />
        </div>
      )}
    </LocationCategoryLayout>
  );
};

export default LocationCategory;