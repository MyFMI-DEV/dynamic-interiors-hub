import { marked } from 'marked';

export const setupCustomRenderers = () => {
  marked.setOptions({
    breaks: true,
    gfm: true
  });
  
  marked.use({
    renderer: {
      image(href, title, text) {
        // Handle image URLs
        let imageUrl = href;
        
        // If it's not an external URL or already in lovable-uploads, prepend the path
        if (href && !href.startsWith('/lovable-uploads/') && !href.startsWith('http')) {
          imageUrl = `/lovable-uploads/${href}`;
        }
        
        // Fallback images from Unsplash if image fails to load
        const fallbackImages = [
          'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          'https://images.unsplash.com/photo-1518770660439-4636190af475',
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
        ];

        console.log('Processing image URL:', { 
          original: href, 
          processed: imageUrl,
          isExternal: href?.startsWith('http')
        });

        return `
          <div class="my-8">
            <img 
              src="${imageUrl}" 
              alt="${text || title || 'Article image'}" 
              class="w-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              style="max-height: 800px; min-height: 400px;"
              loading="lazy"
              onerror="this.onerror=null; this.src='${fallbackImages[Math.floor(Math.random() * fallbackImages.length)]}'; console.log('Image failed to load:', '${imageUrl}');"
            />
            ${title ? `<p class="text-center text-sm text-gray-600 mt-2">${title}</p>` : ''}
          </div>
        `;
      },
      paragraph(text) {
        return `<p class="text-gray-700 mb-4 leading-relaxed">${text}</p>`;
      },
      heading(text, level) {
        const sizes = {
          1: 'text-4xl',
          2: 'text-3xl',
          3: 'text-2xl',
          4: 'text-xl',
          5: 'text-lg',
          6: 'text-base'
        };
        return `<h${level} class="${sizes[level as keyof typeof sizes]} font-bold text-primary my-4">${text}</h${level}>`;
      },
      list(body, ordered) {
        const type = ordered ? 'ol' : 'ul';
        const className = ordered ? 'list-decimal' : 'list-disc';
        return `<${type} class="pl-6 ${className} space-y-2 my-4">${body}</${type}>`;
      },
      listitem(text) {
        return `<li class="text-gray-700">${text}</li>`;
      },
      table(header, body) {
        return `
          <div class="overflow-x-auto my-8">
            <table class="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
              <thead class="bg-primary text-white">
                ${header}
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${body}
              </tbody>
            </table>
          </div>
        `;
      },
      tablerow(content) {
        return `<tr class="hover:bg-accent transition-colors">${content}</tr>`;
      },
      tablecell(content, { header }) {
        if (header) {
          return `<th class="px-6 py-3 text-left text-sm font-medium tracking-wider">${content}</th>`;
        }
        return `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${content}</td>`;
      }
    }
  });
};