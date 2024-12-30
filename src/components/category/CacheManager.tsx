import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface CacheManagerProps {
  location: string | undefined;
  category: string | undefined;
  description: string | undefined;
  seoMetadata: any;
  categoryImage: string | undefined;
  cachedPage: any;
}

const CacheManager = ({ 
  location, 
  category, 
  description, 
  seoMetadata, 
  categoryImage, 
  cachedPage 
}: CacheManagerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const cachePageData = async () => {
      console.log('CacheManager: Checking conditions for caching...', {
        description: !!description,
        seoMetadata: !!seoMetadata,
        categoryImage: !!categoryImage,
        cachedPage: !!cachedPage,
        location,
        category
      });

      if (description && seoMetadata && categoryImage && !cachedPage && location && category) {
        console.log('CacheManager: Caching new page data');
        
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
            title: "Cache Error",
            description: "Failed to cache page data. Please try refreshing.",
            variant: "destructive",
          });
        } else {
          console.log('CacheManager: Successfully cached page data');
          toast({
            title: "Success",
            description: "Page data cached successfully.",
          });
        }
      } else {
        console.log('CacheManager: Skipping cache operation - conditions not met');
      }
    };

    cachePageData();
  }, [description, seoMetadata, categoryImage, location, category, cachedPage, toast]);

  return null;
};

export default CacheManager;