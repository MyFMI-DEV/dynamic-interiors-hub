export const processArticleContent = (content: string, articleId: string) => {
  try {
    console.log('Processing article content for article:', articleId);
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    if (doc.body.textContent === 'null') {
      console.warn('Parsed document body is null');
      return '';
    }

    const images = Array.from(doc.getElementsByTagName('img'));
    console.log('Found images:', images.length);
    
    images.forEach((img, index) => {
      if (!img.src && img.alt) {
        console.log(`Processing image ${index + 1}:`, { alt: img.alt });
        const wrapper = doc.createElement('div');
        wrapper.setAttribute('data-image-alt', img.alt);
        wrapper.setAttribute('data-article-id', articleId);
        wrapper.className = 'article-image-wrapper';
        img.parentNode?.replaceChild(wrapper, img);
      }
    });

    return doc.body.innerHTML;
  } catch (error) {
    console.error('Error processing article content:', error);
    return content;
  }
};