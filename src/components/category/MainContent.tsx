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

  // Define loading states
  const isLoadingContent = isLoadingCache || isLoadingDescription;
  const isLoadingImage = isLoadingCache || isLoadingImageState;
  const isLoadingFAQs = isLoadingCache;

  // Get content from cache or fresh data
  const paragraphs = cachedPage?.description ? 
    cachedPage.description.split('\n\n') : 
    description?.split('\n\n') || [];

  const currentSEO = cachedPage?.seoMetadata || seoMetadata;
  const currentImage = cachedPage?.categoryImage || categoryImage;

  return (
    <>
      {/* Handle SEO */}
      {currentSEO && (
        <SEOHead
          title={currentSEO.meta_title}
          description={currentSEO.meta_description}
          keywords={currentSEO.keywords}
          location={location}
          category={category}
        />
      )}

      {/* Render main content */}
      <CategoryContent 
        categoryImage={currentImage}
        category={category}
        location={location}
        paragraphs={paragraphs}
        isLoadingContent={isLoadingContent}
        isLoadingImage={isLoadingImage}
        isLoadingFAQs={isLoadingFAQs}
      />

      {/* Render category tabs */}
      {categoriesData && (
        <div className="mt-8">
          <CategoryTabs categories={categoriesData} location={location} />
        </div>
      )}

      {/* Handle caching */}
      {!isLoadingCache && !isLoadingDescription && !isLoadingSEO && !isLoadingImageState && (
        <CacheManager
          location={location}
          category={category}
          description={description}
          seoMetadata={seoMetadata}
          categoryImage={categoryImage}
          cachedPage={cachedPage}
        />
      )}
    </>
  );
};

export default MainContent;