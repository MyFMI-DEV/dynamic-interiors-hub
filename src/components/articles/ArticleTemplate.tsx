import { marked } from "marked";

interface ArticleTemplateProps {
  title: string;
  content: string;
  imageUrl?: string;
}

export const ArticleTemplate = ({
  title,
  content,
  imageUrl,
}: ArticleTemplateProps) => {
  // Configure marked to handle images properly
  marked.use({
    renderer: {
      image(href, title, text) {
        return `<img src="${href}" alt="${text}" title="${title || ''}" class="w-full h-auto rounded-lg shadow-lg my-4" />`;
      }
    }
  });

  const htmlContent = marked(content);

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">{title}</h1>
      
      {imageUrl && (
        <div className="mb-8">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};