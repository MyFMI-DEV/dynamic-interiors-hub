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

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 max-w-6xl mx-auto px-4">
        <div className="md:w-1/2">
          <p className="text-2xl md:text-3xl font-bold text-primary bg-accent p-6 rounded-lg shadow-lg">
            "Have you heard about Find my interiors.com? They are a game changer if you're renovating your house or looking for a great quote on {formattedCategory.toLowerCase()} near {formattedMainLocation} {formattedSubLocation}."
          </p>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/lovable-uploads/72684d42-3b44-420d-9ee9-d71df69c29ff.png"
            alt="Person thinking about interior design"
            className="rounded-lg shadow-lg max-w-[300px] mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default LocationCategoryHeader;