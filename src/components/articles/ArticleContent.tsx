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
        // Handle both absolute and relative URLs
        const imageUrl = href?.startsWith('http') ? href : `/lovable-uploads/${href?.replace('/lovable-uploads/', '')}`;
        return `
          <figure class="my-8">
            <img 
              src="${imageUrl}" 
              alt="${text || title || 'Article image'}" 
              class="w-full h-auto rounded-lg shadow-md max-w-full"
              loading="lazy"
              onerror="console.error('Failed to load image:', this.src)"
            />
            ${title ? `<figcaption class="text-center text-sm text-gray-600 mt-2">${title}</figcaption>` : ''}
          </figure>
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