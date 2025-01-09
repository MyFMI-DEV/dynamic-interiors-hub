import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

export default MarkdownRenderer;