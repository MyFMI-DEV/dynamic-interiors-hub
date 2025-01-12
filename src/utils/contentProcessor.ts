export const processArticleContent = (content: string, articleId: string) => {
  if (!content) return '';
  
  try {
    console.log('Processing article content for article:', articleId);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    const images = Array.from(doc.getElementsByTagName('img'));
    console.log('Found images:', images.length);
    
    images.forEach((img, index) => {
      console.log(`Processing image ${index + 1}:`, {
        src: img.src,
        alt: img.alt,
        parentNode: img.parentNode?.nodeName
      });

      const wrapper = doc.createElement('div');
      wrapper.setAttribute('data-image-alt', img.src || ''); // Use src as alt to pass the URL
      wrapper.setAttribute('data-article-id', articleId);
      wrapper.className = 'article-image-wrapper';
      
      if (img.parentNode) {
        img.parentNode.replaceChild(wrapper, img);
        console.log(`Created wrapper for image ${index + 1} with URL:`, img.src);
      }
    });

    return doc.body.innerHTML;
  } catch (error) {
    console.error('Error processing article content:', error);
    return content;
  }
};