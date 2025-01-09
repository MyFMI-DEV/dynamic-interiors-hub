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
        // Process the image URL
        let imageUrl = href;
        
        // If it's a findmyinteriors.co.uk URL, extract just the filename
        if (href?.includes('findmyinteriors.co.uk')) {
          const filename = href.split('/').pop(); // Get just the filename
          if (filename) {
            imageUrl = filename;
          }
        }
        
        // Clean the path and ensure proper structure
        const cleanPath = imageUrl?.replace(/^\/?(lovable-uploads\/)?/, '');
        const finalUrl = `/lovable-uploads/${cleanPath}`;
        
        console.log('Processing image URL:', { 
          original: href, 
          cleaned: cleanPath, 
          final: finalUrl,
          isFromFindMyInteriors: href?.includes('findmyinteriors.co.uk')
        });

        return `
          <div class="my-8 max-w-3xl mx-auto">
            <img 
              src="${finalUrl}" 
              alt="${text || title || 'Article image'}" 
              class="w-full h-[400px] object-cover rounded-lg shadow-md mx-auto"
              style="max-height: 600px; min-height: 300px;"
              loading="lazy"
              onerror="this.onerror=null; this.src='/placeholder.svg'; console.log('Image failed to load:', '${finalUrl}');"
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