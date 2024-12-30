import { useNavigate } from "react-router-dom";
import SearchableDropdown from "./SearchableDropdown";
import PostButton from "./PostButton";

interface BannerActionsProps {
  location: string;
  category: string;
  locations: { heading: string; items: string[] }[];
  categories: { heading: string; items: string[] }[];
  isLoadingLocations: boolean;
  isLoadingCategories: boolean;
}

const BannerActions = ({ 
  location, 
  category, 
  locations, 
  categories,
  isLoadingLocations,
  isLoadingCategories 
}: BannerActionsProps) => {
  const navigate = useNavigate();

  const handleLocationSelect = (loc: string) => {
    const formattedLoc = loc.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${formattedLoc}/${category}`);
  };

  const handleCategorySelect = (cat: string) => {
    const formattedCat = cat.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${location}/${formattedCat}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SearchableDropdown
        title="Change Location"
        groups={locations || []}
        value={location}
        onSelect={handleLocationSelect}
        isLoading={isLoadingLocations}
      />
      <SearchableDropdown
        title="Change Category"
        groups={categories || []}
        value={category}
        onSelect={handleCategorySelect}
        isLoading={isLoadingCategories}
      />
      <PostButton />
    </div>
  );
};

export default BannerActions;