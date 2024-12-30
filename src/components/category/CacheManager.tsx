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
      if (description && seoMetadata && categoryImage && !cachedPage && location && category) {
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
        }
      }
    };

    cachePageData();
  }, [description, seoMetadata, categoryImage, location, category, cachedPage, toast]);

  return null;
};

export default CacheManager;