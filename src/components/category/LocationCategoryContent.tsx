import { SEOHead } from "@/components/SEOHead";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import LocationCategoryHeader from "@/components/category/LocationCategoryHeader";

interface LocationCategoryContentProps {
  data: {
    cachedPage: any;
    description: string;
    seoMetadata: any;
    categoryImage: string;
    categories: any[];
    mainLocation: string;
    subLocation: string;
  };
  location: string | undefined;
  category: string | undefined;
}

const LocationCategoryContent = ({ 
  data: {
    cachedPage,
    description,
    seoMetadata,
    categoryImage,
    categories,
    mainLocation,
    subLocation,
  },
  location,
  category,
}: LocationCategoryContentProps) => {
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
    </>
  );
};

export default LocationCategoryContent;