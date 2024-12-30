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

      <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-8">
        {category} in {mainLocation} - {subLocation}
      </h1>
    </>
  );
};

export default LocationCategoryHeader;