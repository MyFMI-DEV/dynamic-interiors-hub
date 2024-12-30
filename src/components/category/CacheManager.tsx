import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface CacheManagerProps {
  location: string;
  category: string;
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

  React.useEffect(() => {
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
          }, {
            onConflict: 'location,category'
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

  return null;
};

export default CacheManager;