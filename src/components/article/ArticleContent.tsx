import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArticleImage } from './ArticleImage';
import { processArticleContent } from '@/utils/contentProcessor';

interface ArticleContentProps {
  content: string;
  articleId: string;
}

export const ArticleContent = ({ content, articleId }: ArticleContentProps) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const rootsRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const cleanupRoots = () => {
      rootsRef.current.forEach((root) => {
        try {
          root.unmount();
        } catch (error) {
          console.error('Error unmounting React root:', error);
        }
      });
      rootsRef.current.clear();
    };

    const initializeImages = () => {
      if (!articleRef.current) return;

      const imageWrappers = articleRef.current.querySelectorAll('.article-image-wrapper');
      console.log('Found image wrappers:', imageWrappers.length);

      imageWrappers.forEach((wrapper) => {
        const alt = wrapper.getAttribute('data-image-alt');
        const wrapperArticleId = wrapper.getAttribute('data-article-id');

        if (alt && wrapperArticleId) {
          const container = document.createElement('div');
          wrapper.replaceWith(container);

          const root = createRoot(container);
          rootsRef.current.set(alt, root);
          
          root.render(<ArticleImage alt={alt} articleId={wrapperArticleId} />);
        }
      });
    };

    initializeImages();
    return cleanupRoots;
  }, [content, articleId]);

  const processedContent = processArticleContent(content, articleId);

  return (
    <article 
      ref={articleRef}
      className="
        prose prose-lg mx-auto max-w-4xl
        prose-headings:font-bold
        prose-h1:text-5xl prose-h1:text-[#006D77] prose-h1:mb-12 prose-h1:leading-tight
        prose-h2:text-3xl prose-h2:text-[#83C5BE] prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:text-[#006D77] prose-h3:mt-10 prose-h3:mb-4
        prose-p:text-[#4A5568] prose-p:leading-relaxed prose-p:mb-8
        prose-a:text-[#83C5BE] prose-a:no-underline hover:prose-a:text-[#83C5BE]/80
        prose-img:rounded-lg prose-img:shadow-md prose-img:my-12
        prose-strong:text-[#2D3748] prose-strong:font-semibold
        prose-ul:list-disc prose-ul:my-8 prose-ul:bg-[#EDF6F9] prose-ul:p-6 prose-ul:rounded-lg
        prose-ol:list-decimal prose-ol:my-8
        prose-li:text-[#4A5568] prose-li:mb-3
        prose-table:border-collapse prose-table:my-8 prose-table:w-full
        prose-th:bg-[#EDF6F9] prose-th:text-[#006D77] prose-th:p-4 prose-th:text-left
        prose-td:border prose-td:border-[#E2E8F0] prose-td:p-4
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#83C5BE] [&_blockquote]:pl-6 
        [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:bg-[#EDF6F9] 
        [&_blockquote]:p-6 [&_blockquote]:rounded-r-lg
        [&_.div-container]:bg-transparent
        space-y-8
      "
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};