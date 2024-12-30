import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  useEffect(() => {
    const fetchSitemap = async () => {
      const { data } = await supabase.functions.invoke('generate-sitemap');
      
      // Create a Blob from the XML data
      const blob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(blob);
      
      // Download the sitemap
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

    fetchSitemap();
  }, []);

  return null;
};

export default Sitemap;