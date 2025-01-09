import { marked } from 'marked';
import { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { setupCustomRenderers } from './CustomRenderers';

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    const processMarkdown = async () => {
      setupCustomRenderers();
      const processed = await marked(content);
      setHtmlContent(processed);
    };

    processMarkdown();
  }, [content]);
  
  return (
    <MarkdownRenderer 
      content={htmlContent}
      className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-gray-700 prose-img:mx-auto prose-img:block"
    />
  );
};

export default ArticleContent;