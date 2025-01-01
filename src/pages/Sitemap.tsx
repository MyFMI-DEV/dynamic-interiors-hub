import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

const Sitemap = () => {
  const [xmlContent, setXmlContent] = useState<string>('');

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const { data } = await supabase.functions.invoke('generate-sitemap');
        if (data) {
          // Create a new document with the XML content
          const doc = document.implementation.createHTMLDocument('');
          doc.documentElement.innerHTML = data;
          
          // Set the content type to XML
          const meta = document.createElement('meta');
          meta.httpEquiv = 'Content-Type';
          meta.content = 'application/xml';
          document.head.appendChild(meta);
          
          // Display the XML content
          setXmlContent(data);
        }
      } catch (error) {
        console.error('Error fetching sitemap:', error);
      }
    };

    fetchSitemap();
  }, []);

  return (
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {xmlContent}
    </pre>
  );
};

export default Sitemap;