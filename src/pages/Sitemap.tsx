import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  useEffect(() => {
    const fetchAndServeSitemap = async () => {
      try {
        const { data } = await supabase.functions.invoke('generate-sitemap');
        if (data) {
          const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>${data}`;
          window.location.href = '/sitemap.xml';
        }
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };

    fetchAndServeSitemap();
  }, []);

  return null;
};

export default Sitemap;