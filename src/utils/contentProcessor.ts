export const processArticleContent = (content: string, articleId: string) => {
  try {
    console.log('Processing article content for article:', articleId);
    console.log('Raw content:', content?.substring(0, 100) + '...');

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    if (doc.body.textContent === 'null') {
      console.warn('Parsed document body is null');
      return '';
    }

    const images = Array.from(doc.getElementsByTagName('img'));
    console.log('Found images:', images.length);
    
    images.forEach((img, index) => {
      console.log(`Processing image ${index + 1}:`, {
        src: img.src,
        alt: img.alt,
        parentNode: img.parentNode?.nodeName
      });

      // Only process images without src but with alt text
      if (!img.getAttribute('src') && img.getAttribute('alt')) {
        const wrapper = doc.createElement('div');
        wrapper.setAttribute('data-image-alt', img.getAttribute('alt') || '');
        wrapper.setAttribute('data-article-id', articleId);
        wrapper.className = 'article-image-wrapper';
        
        // Replace the img with the wrapper
        if (img.parentNode) {
          img.parentNode.replaceChild(wrapper, img);
          console.log(`Created wrapper for image ${index + 1} with alt:`, img.getAttribute('alt'));
        }
      }
    });

    const result = doc.body.innerHTML;
    console.log('Processed content length:', result.length);
    return result;
  } catch (error) {
    console.error('Error processing article content:', error);
    return content;
  }
};