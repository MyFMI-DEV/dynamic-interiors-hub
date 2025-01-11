import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import KeyPointsSection from "@/components/article/KeyPointsSection";
import FAQSection from "@/components/article/FAQSection";
import { fetchArticleBySlug } from "@/lib/articleUtils";
import { useArticleImage } from "@/hooks/useArticleImage";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug as string),
    enabled: !!slug
  });

  const ImageComponent = ({ alt, articleId }: { alt: string; articleId: string }) => {
    const { data: imageUrl, isLoading, error } = useArticleImage(articleId, alt);

    if (error) {
      toast({
        title: "Error loading image",
        description: "There was a problem loading the image. Please try again later.",
        variant: "destructive",
      });
      return null;
    }

    if (isLoading) {
      return (
        <div className="w-full my-8">
          <Skeleton className="w-full h-64" />
        </div>
      );
    }

    return imageUrl ? (
      <img
        src={imageUrl}
        alt={alt}
        className="w-full aspect-video object-cover rounded-lg my-8"
      />
    ) : null;
  };

  const processContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = Array.from(doc.getElementsByTagName('img'));
    
    images.forEach((img) => {
      if (!img.src && img.alt && article?.id) {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('data-image-alt', img.alt);
        wrapper.setAttribute('data-article-id', article.id);
        img.parentNode?.replaceChild(wrapper, img);
      }
    });

    return doc.body.innerHTML;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse">Loading article...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) return null;

  const processedContent = processContent(article.content);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.meta_title}
        description={article.meta_description}
        keywords={["interior design", "home improvement", "UK interiors"]}
        location="UK"
        category="Articles"
      />
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <article 
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
          ref={(el) => {
            if (el) {
              const imageWrappers = el.querySelectorAll('div[data-image-alt]');
              imageWrappers.forEach((wrapper) => {
                const alt = wrapper.getAttribute('data-image-alt');
                const articleId = wrapper.getAttribute('data-article-id');
                if (alt && articleId) {
                  const root = document.createElement('div');
                  wrapper.replaceWith(root);
                  const imageComponent = <ImageComponent alt={alt} articleId={articleId} />;
                  // @ts-ignore - React 18 createRoot API
                  const reactRoot = require('react-dom/client').createRoot(root);
                  reactRoot.render(imageComponent);
                }
              });
            }
          }}
        />
        
        {article.faqs && article.faqs.length > 0 && (
          <FAQSection faqs={article.faqs} />
        )}
      </article>
    </main>
    <Footer />
  </div>
  );
};

export default ArticleDetail;