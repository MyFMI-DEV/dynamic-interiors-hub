import { marked } from 'marked';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked to handle images with proper styling
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  marked.use({
    renderer: {
      image(href, title, text) {
        // Ensure we're not double-prefixing the URL
        const imageUrl = href?.startsWith('http') 
          ? href 
          : `/lovable-uploads/${href?.replace(/^\/lovable-uploads\//, '')}`;

        return `
          <div class="my-8 max-w-3xl mx-auto">
            <img 
              src="${imageUrl}" 
              alt="${text || title || 'Article image'}" 
              class="w-full h-[400px] object-cover rounded-lg shadow-md mx-auto"
              style="max-height: 600px; min-height: 300px;"
              loading="lazy"
              onerror="this.onerror=null; this.src='/placeholder.svg'; console.error('Failed to load image:', '${imageUrl}');"
            />
            ${title ? `<p class="text-center text-sm text-gray-600 mt-2">${title}</p>` : ''}
          </div>
        `;
      }
    }
  });
  
  const htmlContent = marked(content);
  
  return (
    <div 
      className="prose prose-lg max-w-none prose-img:mx-auto prose-img:block"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;