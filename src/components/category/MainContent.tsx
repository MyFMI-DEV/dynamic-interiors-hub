import React from 'react';
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useCachedPage } from "@/hooks/useCachedPage";
import { useCategories } from "@/hooks/useCategories";
import { SEOHead } from "@/components/SEOHead";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import CacheManager from "@/components/category/CacheManager";

interface MainContentProps {
  location: string;
  category: string;
}

const MainContent = ({ location, category }: MainContentProps) => {
  // Fetch cached page data
  const { data: cachedPage, isLoading: isLoadingCache } = useCachedPage(location, category);

  // Fetch categories for the tabs
  const { data: categoriesData } = useCategories();

  // Fetch or use cached data
  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImageState } = useCategoryImage(category);

  // Handle caching
  const shouldCache = !isLoadingCache && !isLoadingDescription && !isLoadingSEO && !isLoadingImageState;
  
  if (shouldCache) {
    return (
      <CacheManager
        location={location}
        category={category}
        description={description}
        seoMetadata={seoMetadata}
        categoryImage={categoryImage}
        cachedPage={cachedPage}
      />
    );
  }

  // Define loading states
  const isLoadingContent = isLoadingCache || isLoadingDescription;
  const isLoadingImage = isLoadingCache || isLoadingImageState;
  const isLoadingFAQs = isLoadingCache;

  const paragraphs = cachedPage ? 
    cachedPage.description.split('\n\n') : 
    description?.split('\n\n') || [];

  return (
    <>
      {(cachedPage?.seoMetadata || seoMetadata) && (
        <SEOHead
          title={cachedPage?.seoMetadata?.meta_title || seoMetadata.meta_title}
          description={cachedPage?.seoMetadata?.meta_description || seoMetadata.meta_description}
          keywords={cachedPage?.seoMetadata?.keywords || seoMetadata.keywords}
          location={location}
          category={category}
        />
      )}

      <CategoryContent 
        categoryImage={cachedPage?.categoryImage || categoryImage}
        category={category}
        location={location}
        paragraphs={paragraphs}
        isLoadingContent={isLoadingContent}
        isLoadingImage={isLoadingImage}
        isLoadingFAQs={isLoadingFAQs}
      />

      {categoriesData && (
        <div className="mt-8">
          <CategoryTabs categories={categoriesData} location={location} />
        </div>
      )}
    </>
  );
};

export default MainContent;