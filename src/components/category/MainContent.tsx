import React from 'react';
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import { Json } from "@/integrations/supabase/types";

interface MainContentProps {
  location: string;
  category: string;
}

interface CachedContent {
  description: string;
  seoMetadata: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  categoryImage: string;
}

type DatabaseCachedPage = {
  id: string;
  location: string;
  category: string;
  content: Json;
  last_updated: string;
}

const MainContent = ({ location, category }: MainContentProps) => {
  const { toast } = useToast();

  // Fetch categories for the tabs
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category, sub_category')
        .order('main_category');
      
      if (error) throw error;

      // Group categories by main category
      const groupedCategories = data.reduce((acc: { main_category: string; sub_categories: string[]; }[], curr) => {
        const existingCategory = acc.find(c => c.main_category === curr.main_category);
        if (existingCategory) {
          existingCategory.sub_categories.push(curr.sub_category);
        } else {
          acc.push({
            main_category: curr.main_category,
            sub_categories: [curr.sub_category],
          });
        }
        return acc;
      }, []);

      return groupedCategories;
    },
  });

  // Check for cached page data
  const { data: cachedPage, isLoading: isLoadingCache } = useQuery({
    queryKey: ['cached-page', location, category],
    queryFn: async () => {
      console.log('Checking for cached data:', location, category);
      
      const { data, error } = await supabase
        .from('cached_pages')
        .select('*')
        .eq('location', location?.toLowerCase())
        .eq('category', category?.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        console.log('Found cached data:', data);
        const typedData = data as DatabaseCachedPage;
        return typedData.content as unknown as CachedContent;
      }
      console.log('No cached data found');
      return null;
    },
  });

  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImage } = useCategoryImage(category);

  // Cache the page data when all content is loaded
  React.useEffect(() => {
    const cachePageData = async () => {
      if (description && seoMetadata && categoryImage && !cachedPage && location && category) {
        console.log('Caching new page data');
        
        const pageContent: CachedContent = {
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

    cachePageData();
  }, [description, seoMetadata, categoryImage, location, category, cachedPage, toast]);

  const isLoading = isLoadingCache || isLoadingDescription || isLoadingSEO || isLoadingImage;

  if (isLoading) {
    return <div className="space-y-8 animate-pulse">
      <div className="h-64 bg-muted rounded-lg" />
      <div className="h-96 bg-muted rounded-lg" />
    </div>;
  }

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