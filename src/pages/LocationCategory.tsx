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
      const { data, error } = await supabase
        .from('cached_pages')
        .select('*')
        .eq('location', location?.toLowerCase())
        .eq('category', category?.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      return data;
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
      if (description && seoMetadata && categoryImage && !cachedPage) {
        const pageContent = {
          description,
          seoMetadata,
          categoryImage,
        };

        const { error } = await supabase
          .from('cached_pages')
          .upsert({
            location: location?.toLowerCase(),
            category: category?.toLowerCase(),
            content: pageContent,
          });

        if (error) {
          console.error('Error caching page:', error);
        }
      }
    };

    cachePageData();
  }, [description, seoMetadata, categoryImage, location, category, cachedPage]);

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

  // Use cached data if available
  useEffect(() => {
    if (cachedPage) {
      console.log('Using cached page data');
    }
  }, [cachedPage]);

  const isLoading = isLoadingLocation || isLoadingDescription || isLoadingSEO || loadingCategories || isLoadingImage || isLoadingCache;

  if (isLoading) {
    return <LoadingState />;
  }

  const paragraphs = cachedPage ? 
    cachedPage.content.description?.split('\n\n') : 
    description?.split('\n\n') || [];

  return (
    <LocationCategoryLayout>
      {(cachedPage?.content.seoMetadata || seoMetadata) && (
        <SEOHead
          title={cachedPage?.content.seoMetadata?.meta_title || seoMetadata.meta_title}
          description={cachedPage?.content.seoMetadata?.meta_description || seoMetadata.meta_description}
          keywords={cachedPage?.content.seoMetadata?.keywords || seoMetadata.keywords}
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
        categoryImage={cachedPage?.content.categoryImage || categoryImage}
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