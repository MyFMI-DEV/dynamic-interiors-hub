import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import LoadingState from "@/components/ui/LoadingState";
import CategoryContent from "@/components/category/CategoryContent";
import CategoryTabs from "@/components/category/CategoryTabs";
import LocationCategoryHeader from "@/components/category/LocationCategoryHeader";
import LocationCategoryLayout from "@/components/category/LocationCategoryLayout";
import { useQuery } from "@tanstack/react-query";
import { Json } from "@/integrations/supabase/types";

interface SEOMetadata {
  meta_title: string;
  meta_description: string;
  keywords: string[];
}

interface CachedContent {
  description: string;
  seoMetadata: SEOMetadata;
  categoryImage: string;
}

type DatabaseCachedPage = {
  id: string;
  location: string;
  category: string;
  content: Json;
  last_updated: string;
}

const LocationCategory = () => {
  const { location, category } = useParams();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [mainLocation, setMainLocation] = useState("");
  const [subLocation, setSubLocation] = useState("");
  const { toast } = useToast();

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

  useEffect(() => {
    if (location) {
      const parts = location.split('-');
      const mainLoc = parts[0];
      const subLoc = parts.slice(1).join(' ');
      setMainLocation(mainLoc);
      setSubLocation(subLoc);
    }
  }, [location]);

  const { data: locationData, isLoading: isLoadingLocation } = useLocationData(location);
  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImage } = useCategoryImage(category);

  // Cache the page data when all content is loaded
  useEffect(() => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('main_category, sub_category')
          .order('main_category', { ascending: true });

        if (error) throw error;

        const groupedCategories = data.reduce((acc, curr) => {
          const existingCategory = acc.find(c => c.main_category === curr.main_category);
          if (existingCategory) {
            existingCategory.sub_categories.push(curr.sub_category);
          } else {
            acc.push({
              main_category: curr.main_category,
              sub_categories: [curr.sub_category]
            });
          }
          return acc;
        }, []);

        setCategories(groupedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const isLoading = isLoadingLocation || isLoadingDescription || isLoadingSEO || loadingCategories || isLoadingImage || isLoadingCache;

  if (isLoading) {
    return <LoadingState />;
  }

  const paragraphs = cachedPage ? 
    cachedPage.description.split('\n\n') : 
    description?.split('\n\n') || [];

  return (
    <LocationCategoryLayout>
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
