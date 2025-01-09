import { marked } from 'marked';
import { useQuery } from '@tanstack/react-query';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Use React Query to handle the async markdown conversion
  const { data: htmlContent, isLoading } = useQuery({
    queryKey: ['markdown', content],
    queryFn: async () => {
      return await marked(content || '');
    }
  });
  
  if (isLoading) {
    return <div>Converting markdown...</div>;
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-accent rounded-lg">
        <h3 className="font-bold text-primary mb-2">Debug Information:</h3>
        <p className="mb-2"><strong>Raw content:</strong> {content}</p>
        <p><strong>HTML content:</strong> {htmlContent}</p>
      </div>
      
      <div 
        className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary-light"
        dangerouslySetInnerHTML={{ __html: htmlContent || '' }} 
      />
    </div>
  );
};

export default ArticleContent;