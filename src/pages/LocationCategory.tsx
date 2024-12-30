import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useCachedPage } from "@/hooks/useCachedPage";
import { useIframeMessage } from "@/hooks/useIframeMessage";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import LocationCategoryHeader from "@/components/category/LocationCategoryHeader";
import LocationCategoryLayout from "@/components/category/LocationCategoryLayout";
import LocationParser from "@/components/category/LocationParser";
import CategoryDataLoader from "@/components/category/CategoryDataLoader";
import LoadingProgress from "@/components/category/LoadingProgress";
import CacheManager from "@/components/category/CacheManager";

const LocationCategory = () => {
  const { location, category } = useParams();
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");

  console.log('Rendering LocationCategory with:', { location, category });

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
  
  useIframeMessage();

  const handleLocationParsed = (mainLoc: string, subLoc: string) => {
    setMainLocation(mainLoc);
    setSubLocation(subLoc);
  };

  // Handle errors with toast notifications
  React.useEffect(() => {
    const errors = [
      { error: cacheError, message: "Error loading cached data" },
      { error: locationError, message: "Error verifying location" },
      { error: descriptionError, message: "Error loading description" },
      { error: seoError, message: "Error loading SEO data" },
      { error: imageError, message: "Error loading images" }
    ];

    errors.forEach(({ error, message }) => {
      if (error) {
        console.error(message, error);
        toast({
          title: "Error",
          description: `${message}. Please try again.`,
          variant: "destructive",
        });
      }
    });
  }, [cacheError, locationError, descriptionError, seoError, imageError, toast]);

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

  if (isLoading) {
    return (
      <LoadingProgress 
        category={category} 
        location={location} 
        progress={loadingProgress}
        loadingSteps={loadingSteps}
      />
    );
  }

  const paragraphs = cachedPage ? 
    cachedPage.description.split('\n\n') : 
    description?.split('\n\n') || [];

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
        description={description}
        seoMetadata={seoMetadata}
        categoryImage={categoryImage}
        cachedPage={cachedPage}
      />

      {(cachedPage?.seoMetadata || seoMetadata) && (
        <SEOHead
          title={cachedPage?.seoMetadata?.meta_title || seoMetadata.meta_title}
          description={cachedPage?.seoMetadata?.meta_description || seoMetadata.meta_description}
          keywords={cachedPage?.seoMetadata?.keywords || seoMetadata.keywords}
          location={location || ''}
          category={category || ''}
        />
      )}

      <LocationCategoryHeader
        mainLocation={mainLocation}
        subLocation={subLocation}
        location={location || ''}
        category={category || ''}
      />

      <CategoryContent 
        categoryImage={cachedPage?.categoryImage || categoryImage}
        category={category || ''}
        location={location || ''}
        paragraphs={paragraphs}
      />

      <div className="mt-8">
        <CategoryTabs categories={categories} location={location || ''} />
      </div>
    </LocationCategoryLayout>
  );
};

export default LocationCategory;