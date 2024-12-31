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
  // Format strings to capitalize first letter and handle 'all' case
  const formattedCategory = category.toLowerCase() === 'all' 
    ? 'Interiors'
    : category.charAt(0).toUpperCase() + category.slice(1);
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

      <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-4">
        {formattedCategory} in {formattedMainLocation} {formattedSubLocation}
      </h1>

      <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto px-4">
        Have you heard about Find my interiors.com? They are a game changer if you're renovating your house or looking for a great quote on your new {formattedCategory.toLowerCase()} near {formattedMainLocation} {formattedSubLocation}.
      </p>
    </>
  );
};

export default LocationCategoryHeader;