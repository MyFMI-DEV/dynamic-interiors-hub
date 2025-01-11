import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import KeyPointsSection from "@/components/article/KeyPointsSection";
import FAQSection from "@/components/article/FAQSection";
import { fetchArticleBySlug } from "@/lib/articleUtils";

const ArticleDetail = () => {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug as string),
    enabled: !!slug
  });

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
        <article className="prose prose-lg mx-auto max-w-4xl">
          <div 
            className="
              prose-headings:font-bold
              prose-h1:text-5xl prose-h1:text-[#006D77] prose-h1:mb-12 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:text-primary-light prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:text-primary prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-primary-light prose-a:no-underline hover:prose-a:text-primary-light/80
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-12
              prose-strong:text-[#221F26] prose-strong:font-semibold
              prose-ul:list-disc prose-ul:my-8 prose-ul:bg-[#F1F0FB] prose-ul:p-6 prose-ul:rounded-lg
              prose-ol:list-decimal prose-ol:my-8
              prose-li:text-muted-foreground prose-li:mb-3
              prose-table:border-collapse prose-table:my-8 prose-table:w-full
              prose-th:bg-[#E5DEFF] prose-th:text-primary prose-th:p-4 prose-th:text-left
              prose-td:border prose-td:border-muted prose-td:p-4
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary-light [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:bg-accent [&_blockquote]:p-6 [&_blockquote]:rounded-r-lg
              [&_.div-container]:bg-transparent
              space-y-8
            "
            dangerouslySetInnerHTML={{ __html: article.content }} 
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