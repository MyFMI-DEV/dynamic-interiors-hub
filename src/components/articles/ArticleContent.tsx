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

  // Convert markdown to HTML
  const htmlContent = marked(content || '');
  
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

export default ArticleContent;