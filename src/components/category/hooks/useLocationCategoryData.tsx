import { useState } from "react";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useCachedPage } from "@/hooks/useCachedPage";
import { useToast } from "@/hooks/use-toast";

export const useLocationCategoryData = (location: string | undefined, category: string | undefined) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");

  console.log('useLocationCategoryData: Initial data fetch', { location, category });

  const { 
    data: cachedPage, 
    isLoading: isLoadingCache,
    error: cacheError 
  } = useCachedPage(location, category);

  const { 
    data: locationData, 
    isLoading: isLoadingLocation,
    error: locationError 
  } = useLocationData(location);

  const { 
    data: description, 
    isLoading: isLoadingDescription,
    error: descriptionError 
  } = useLocationDescription(location, category);

  const { 
    data: seoMetadata, 
    isLoading: isLoadingSEO,
    error: seoError 
  } = useSEOMetadata(location, category);

  const { 
    data: categoryImage, 
    isLoading: isLoadingImage,
    error: imageError 
  } = useCategoryImage(category);

  const handleLocationParsed = (mainLoc: string, subLoc: string) => {
    console.log('useLocationCategoryData: Location parsed', { mainLoc, subLoc });
    setMainLocation(mainLoc);
    setSubLocation(subLoc);
  };

  const loadingSteps = {
    cache: !isLoadingCache,
    location: !isLoadingLocation,
    description: !isLoadingDescription,
    seo: !isLoadingSEO,
    image: !isLoadingImage
  };

  const totalSteps = Object.keys(loadingSteps).length;
  const completedSteps = Object.values(loadingSteps).filter(Boolean).length;
  const loadingProgress = (completedSteps / totalSteps) * 100;

  const isLoading = isLoadingCache || isLoadingLocation || isLoadingDescription || 
                    isLoadingSEO || loadingCategories || isLoadingImage;

  const errors = [
    { error: cacheError, message: "Error loading cached data" },
    { error: locationError, message: "Error verifying location" },
    { error: descriptionError, message: "Error loading description" },
    { error: seoError, message: "Error loading SEO data" },
    { error: imageError, message: "Error loading images" }
  ];

  return {
    data: {
      cachedPage,
      locationData,
      description,
      seoMetadata,
      categoryImage,
      categories,
      mainLocation,
      subLocation,
      loadingSteps,
      loadingProgress,
    },
    loading: {
      isLoading,
      loadingCategories,
    },
    errors,
    handlers: {
      setCategories,
      setLoadingCategories,
      handleLocationParsed,
    }
  };
};