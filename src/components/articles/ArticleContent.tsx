import { marked } from 'marked';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked with basic options
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  // Convert markdown to HTML, with a default empty string if content is undefined
  const htmlContent = marked(content);

  // For debugging
  console.log('Content received:', content);
  console.log('HTML generated:', htmlContent);

  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:text-blue-500"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;