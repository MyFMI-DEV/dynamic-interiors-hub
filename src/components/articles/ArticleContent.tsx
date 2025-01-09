import { marked } from 'marked';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Convert markdown to HTML
  const htmlContent = marked(content || '');
  
  console.log('Raw content:', content);
  console.log('HTML content:', htmlContent);
  
  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary-light"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;