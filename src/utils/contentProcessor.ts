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

      if (!img.src && img.alt) {
        const wrapper = doc.createElement('div');
        wrapper.setAttribute('data-image-alt', img.alt);
        wrapper.setAttribute('data-article-id', articleId);
        wrapper.className = 'article-image-wrapper';
        img.parentNode?.replaceChild(wrapper, img);
        console.log(`Created wrapper for image ${index + 1}:`, wrapper.outerHTML);
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