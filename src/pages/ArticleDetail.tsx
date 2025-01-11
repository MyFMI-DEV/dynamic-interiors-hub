import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FAQSection from "@/components/article/FAQSection";
import { fetchArticleBySlug } from "@/lib/articleUtils";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ArticleContent } from "@/components/article/ArticleContent";

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
        <ErrorBoundary>
          <ArticleContent content={article.content} articleId={article.id} />
        </ErrorBoundary>
        
        {article.faqs && article.faqs.length > 0 && (
          <FAQSection faqs={article.faqs} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;