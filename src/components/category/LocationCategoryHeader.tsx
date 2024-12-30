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
  // Format strings to capitalize first letter
  const formattedCategory = category === 'all' ? 'Interiors Products and Services' : category.charAt(0).toUpperCase() + category.slice(1);
  const formattedMainLocation = mainLocation.charAt(0).toUpperCase() + mainLocation.slice(1);
  const formattedSubLocation = subLocation.charAt(0).toUpperCase() + subLocation.slice(1);

  return (
    <>
      <Breadcrumbs 
        location={mainLocation} 
        subLocation={subLocation}
        category={category}
      />

      <CategoryBanner location={location} category={category} />

      <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-8">
        {formattedCategory} in {formattedMainLocation} {formattedSubLocation}
      </h1>
    </>
  );
};

export default LocationCategoryHeader;