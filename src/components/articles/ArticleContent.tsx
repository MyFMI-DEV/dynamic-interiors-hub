import { marked } from 'marked';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked to properly handle images
  marked.use({
    renderer: {
      image(href, title, text) {
        return `<img src="${href}" alt="${text}" class="w-full h-auto rounded-lg shadow-md my-4" />`;
      }
    }
  });
  
  const htmlContent = marked(content);
  
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;