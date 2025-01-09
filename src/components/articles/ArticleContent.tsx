import { marked } from 'marked';
import MarkdownRenderer from './MarkdownRenderer';
import { setupCustomRenderers } from './CustomRenderers';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  setupCustomRenderers();
  const htmlContent = marked(content);
  
  return (
    <MarkdownRenderer 
      content={htmlContent}
      className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 prose-img:mx-auto prose-img:block"
    />
  );
};

export default ArticleContent;