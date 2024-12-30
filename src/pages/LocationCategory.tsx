import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useCachedPage } from "@/hooks/useCachedPage";
import { useIframeMessage } from "@/hooks/useIframeMessage";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import LoadingState from "@/components/ui/LoadingState";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import LocationCategoryHeader from "@/components/category/LocationCategoryHeader";
import LocationCategoryLayout from "@/components/category/LocationCategoryLayout";
import LocationParser from "@/components/category/LocationParser";
import CategoryDataLoader from "@/components/category/CategoryDataLoader";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import { Progress } from "@/components/ui/progress";

const LocationCategory = () => {
  const { location, category } = useParams();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const { toast } = useToast();

  // Use our custom hooks with better caching
  const { data: cachedPage, isLoading: isLoadingCache } = useCachedPage(location, category);
  const { data: locationData, isLoading: isLoadingLocation } = useLocationData(location);
  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImage } = useCategoryImage(category);
  
  useIframeMessage();

  // Handle location parsing
  const handleLocationParsed = (mainLoc: string, subLoc: string) => {
    setMainLocation(mainLoc);
    setSubLocation(subLoc);
  };

  // Calculate loading progress
  const totalSteps = 5; // Total number of loading steps
  const completedSteps = [
    !isLoadingCache,
    !isLoadingLocation,
    !isLoadingDescription,
    !isLoadingSEO,
    !isLoadingImage
  ].filter(Boolean).length;
  const loadingProgress = (completedSteps / totalSteps) * 100;

  // Cache the page data when all content is loaded
  const cachePageData = async () => {
    if (description && seoMetadata && categoryImage && !cachedPage && location && category) {
      console.log('Caching new page data');
      
      const pageContent = {
        description,
        seoMetadata,
        categoryImage,
      };

      const { error } = await supabase
        .from('cached_pages')
        .upsert({
          location: location.toLowerCase(),
          category: category.toLowerCase(),
          content: pageContent as unknown as Json,
        });

      if (error) {
        console.error('Error caching page:', error);
        toast({
          title: "Error",
          description: "Failed to cache page data.",
          variant: "destructive",
        });
      } else {
        console.log('Successfully cached page data');
      }
    }
  };

  // Call cachePageData when dependencies change
  React.useEffect(() => {
    cachePageData();
  }, [description, seoMetadata, categoryImage, location, category, cachedPage]);

  const isLoading = isLoadingLocation || isLoadingDescription || isLoadingSEO || loadingCategories || isLoadingImage || isLoadingCache;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Progress value={loadingProgress} className="w-full max-w-md mb-4" />
        <p className="text-muted-foreground text-sm">
          Loading {category} services in {location}...
        </p>
        <LoadingState />
      </div>
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