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
  
  return (
    <div>
      <div className="mb-4 p-4 bg-accent rounded-lg">
        <h3 className="font-bold text-primary mb-2">Debug Information:</h3>
        <p className="mb-2"><strong>Raw content:</strong> {content}</p>
        <p><strong>HTML content:</strong> {htmlContent}</p>
      </div>
      
      <div 
        className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary-light"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </div>
  );
};

export default ArticleContent;