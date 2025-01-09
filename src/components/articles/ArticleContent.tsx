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
        if (href?.includes('findmyinteriors.co.uk/lovable-uploads/')) {
          const filename = href.split('lovable-uploads/').pop(); // Get just the filename
          if (filename) {
            imageUrl = `/lovable-uploads/${filename}`;
          }
        }
        
        console.log('Processing image URL:', { 
          original: href, 
          processed: imageUrl,
          isFromFindMyInteriors: href?.includes('findmyinteriors.co.uk')
        });

        // Return the image with proper styling
        return `
          <div class="my-8">
            <img 
              src="${imageUrl}" 
              alt="${text || title || 'Article image'}" 
              class="w-full h-[400px] object-cover rounded-lg shadow-md"
              style="max-height: 600px; min-height: 300px;"
              loading="lazy"
              onerror="this.onerror=null; this.src='/placeholder.svg'; console.log('Image failed to load:', '${imageUrl}');"
            />
            ${title ? `<p class="text-center text-sm text-gray-600 mt-2">${title}</p>` : ''}
          </div>
        `;
      },
      table(header, body) {
        return `
          <div class="overflow-x-auto my-8">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                ${header}
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${body}
              </tbody>
            </table>
          </div>
        `;
      },
      tablerow(content) {
        return `<tr class="hover:bg-gray-50">${content}</tr>`;
      },
      tablecell(content, { header }) {
        if (header) {
          return `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${content}</th>`;
        }
        return `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${content}</td>`;
      },
      list(body, ordered) {
        const type = ordered ? 'ol' : 'ul';
        const className = ordered ? 'list-decimal' : 'list-disc';
        return `<${type} class="pl-6 ${className} space-y-2 my-4">${body}</${type}>`;
      },
      listitem(text) {
        return `<li class="text-gray-700">${text}</li>`;
      }
    }
  });
  
  const htmlContent = marked(content);
  
  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 prose-img:mx-auto prose-img:block"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;