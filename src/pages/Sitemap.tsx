import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  useEffect(() => {
    const fetchAndServeSitemap = async () => {
      try {
        const { data } = await supabase.functions.invoke('generate-sitemap');
        if (data) {
          // Create a Blob with the XML content and correct MIME type
          const blob = new Blob([data], { type: 'application/xml' });
          const url = window.URL.createObjectURL(blob);
          
          // Redirect to the blob URL
          window.location.href = url;
        }
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };

    fetchAndServeSitemap();
  }, []);

  // Return null as we're redirecting to the XML content
  return null;
};

export default Sitemap;