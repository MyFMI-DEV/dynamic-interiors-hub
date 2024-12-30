import { Card } from "@/components/ui/card";
import { useLocationCategories } from "@/hooks/useLocationCategories";
import BannerMessage from "./BannerMessage";
import PostButton from "./PostButton";

interface CategoryBannerProps {
  location: string;
  category: string;
}

const CategoryBanner = ({ location, category }: CategoryBannerProps) => {
  const { 
    locations, 
    categories, 
    isLoadingLocations, 
    isLoadingCategories 
  } = useLocationCategories();

  return (
    <>
      <Card className="bg-primary text-white p-6 mb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <BannerMessage location={location} category={category} />
            <PostButton />
          </div>
        </div>
      </Card>

      {!isLoadingLocations && !isLoadingCategories && locations && categories && (
        <SimplifiedSearch
          locations={locations}
          categories={categories}
          currentLocation={location}
          currentCategory={category}
        />
      )}
    </>
  );
};

export default CategoryBanner;