import { marked } from "marked";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ArticleTemplateProps {
  title: string;
  content: string;
  imageUrl?: string;
  articleId: string;
}

export const ArticleTemplate = ({
  content,
  articleId,
}: ArticleTemplateProps) => {
  // Fetch article images
  const { data: articleImages } = useQuery({
    queryKey: ['article-images', articleId],
    queryFn: async () => {
      const { data: images, error } = await supabase
        .from('article_images')
        .select('*')
        .eq('article_id', articleId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return images;
    },
    enabled: !!articleId
  });

  useEffect(() => {
    // Add custom styles for the minimalist chart
    const style = document.createElement('style');
    style.textContent = `
      .minimalist-key-points {
        background-color: #f8f9fa;
        padding: 2rem;
        border-radius: 8px;
        margin: 2rem 0;
      }
      
      .minimalist-key-points ul {
        list-style-type: none;
        padding-left: 0;
      }
      
      .minimalist-key-points li {
        margin: 1rem 0;
        padding-left: 1.5rem;
        position: relative;
      }
      
      .minimalist-key-points li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #006D77;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0;
      }
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
      }
      
      th {
        background-color: #f8f9fa;
        font-weight: 600;
      }
      
      .prose img {
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .prose h1 {
        color: #006D77;
        font-size: 2.5rem;
        margin-bottom: 2rem;
      }
      
      .prose h2 {
        color: #006D77;
        font-size: 2rem;
        margin: 2.5rem 0 1.5rem;
      }
      
      .prose p {
        margin: 1.5rem 0;
        line-height: 1.8;
      }
      
      .prose a {
        color: #006D77;
        text-decoration: underline;
      }
      
      .prose a:hover {
        color: #83C5BE;
      }
      
      .prose ol {
        list-style-type: decimal;
        padding-left: 1.5rem;
      }
      
      .prose ol li {
        margin: 1rem 0;
      }
      
      .prose strong {
        color: #006D77;
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Configure marked to handle HTML content and use original image URLs
  marked.use({
    renderer: {
      html(html: string) {
        return html;
      },
      image(href: string, title: string, text: string) {
        // Check if we have a matching image from the database
        const matchingImage = articleImages?.find(img => img.alt === text);
        // Use the database URL if available, otherwise use the href from markdown
        const imageUrl = matchingImage?.url || href;
        return `<img src="${imageUrl}" alt="${text}" title="${title || ''}" class="w-full h-auto rounded-lg shadow-lg my-4" />`;
      }
    }
  });

  const htmlContent = marked(content);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};