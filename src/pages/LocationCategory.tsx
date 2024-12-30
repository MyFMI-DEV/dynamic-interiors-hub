import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useCachedPage } from "@/hooks/useCachedPage";
import { useIframeMessage } from "@/hooks/useIframeMessage";
import { SEOHead } from "@/components/SEOHead";
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
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");

  const { data: cachedPage, isLoading: isLoadingCache } = useCachedPage(location, category);
  const { data: locationData, isLoading: isLoadingLocation } = useLocationData(location);
  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImage } = useCategoryImage(category);
  
  useIframeMessage();

  const handleLocationParsed = (mainLoc: string, subLoc: string) => {
    setMainLocation(mainLoc);
    setSubLocation(subLoc);
  };

  const totalSteps = 5;
  const completedSteps = [
    !isLoadingCache,
    !isLoadingLocation,
    !isLoadingDescription,
    !isLoadingSEO,
    !isLoadingImage
  ].filter(Boolean).length;
  const loadingProgress = (completedSteps / totalSteps) * 100;

  const isLoading = isLoadingLocation || isLoadingDescription || isLoadingSEO || 
                    loadingCategories || isLoadingImage || isLoadingCache;

  if (isLoading) {
    return <LoadingProgress 
      category={category} 
      location={location} 
      progress={loadingProgress} 
    />;
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