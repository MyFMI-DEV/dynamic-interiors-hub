import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import CategoryBanner from "./CategoryBanner";

interface LocationCategoryHeaderProps {
  mainLocation: string;
  subLocation: string;
  location: string;
  category: string;
}

const LocationCategoryHeader = ({ 
  mainLocation, 
  subLocation, 
  location, 
  category 
}: LocationCategoryHeaderProps) => {
  return (
    <>
      <Breadcrumbs 
        location={mainLocation} 
        subLocation={subLocation}
        category={category}
      />
      <CategoryBanner location={location} category={category} />
    </>
  );
};

export default LocationCategoryHeader;