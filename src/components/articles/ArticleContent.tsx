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
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-primary">Converting markdown...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {process.env.NODE_ENV === 'development' && (
        <details className="mb-4 p-4 bg-accent rounded-lg text-sm">
          <summary className="font-bold text-primary cursor-pointer">Debug Information</summary>
          <div className="mt-2 space-y-2">
            <p><strong>Raw content:</strong> {content}</p>
            <p><strong>HTML content:</strong> {htmlContent}</p>
          </div>
        </details>
      )}
      
      <div 
        className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary-light prose-p:text-gray-700 prose-strong:text-primary prose-ul:list-disc prose-ol:list-decimal"
        dangerouslySetInnerHTML={{ __html: htmlContent || '' }} 
      />
    </div>
  );
};

export default ArticleContent;