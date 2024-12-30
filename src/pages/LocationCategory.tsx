import { useParams } from "react-router-dom";
import { useIframeMessage } from "@/hooks/useIframeMessage";
import LocationCategoryLayout from "@/components/category/LocationCategoryLayout";
import LocationParser from "@/components/category/LocationParser";
import CategoryDataLoader from "@/components/category/CategoryDataLoader";
import LoadingProgress from "@/components/category/LoadingProgress";
import CacheManager from "@/components/category/CacheManager";
import ErrorHandler from "@/components/category/ErrorHandler";
import LocationCategoryContent from "@/components/category/LocationCategoryContent";
import { useLocationCategoryData } from "@/components/category/hooks/useLocationCategoryData";

const LocationCategory = () => {
  const { location, category } = useParams();
  
  const {
    data,
    loading: { isLoading, loadingCategories },
    errors,
    handlers: {
      setCategories,
      setLoadingCategories,
      handleLocationParsed,
    }
  } = useLocationCategoryData(location, category);
  
  useIframeMessage();

  console.log('LocationCategory: Render state', {
    isLoading,
    loadingProgress: data.loadingProgress,
    location,
    category
  });

  if (isLoading) {
    return (
      <LoadingProgress 
        category={category} 
        location={location} 
        progress={data.loadingProgress}
        loadingSteps={data.loadingSteps}
      />
    );
  }

  return (
    <LocationCategoryLayout>
      <LocationParser 
        location={location} 
        onLocationParsed={handleLocationParsed} 
      />
      
      <CategoryDataLoader 
        onCategoriesLoaded={setCategories}
        onLoadingChange={setLoadingCategories}
      />

      <CacheManager
        location={location}
        category={category}
        description={data.description}
        seoMetadata={data.seoMetadata}
        categoryImage={data.categoryImage}
        cachedPage={data.cachedPage}
      />

      <ErrorHandler errors={errors} />

      <LocationCategoryContent 
        data={data}
        location={location}
        category={category}
      />
    </LocationCategoryLayout>
  );
};

export default LocationCategory;