import { marked } from 'marked';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  // Configure marked to handle GitHub Flavored Markdown
  marked.setOptions({
    gfm: true,
    breaks: true
  });

  // Convert markdown to HTML, ensuring content is a string
  const htmlContent = marked(content || '');
  
  // For debugging
  console.log('Raw content:', content);
  console.log('HTML content:', htmlContent);

  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;