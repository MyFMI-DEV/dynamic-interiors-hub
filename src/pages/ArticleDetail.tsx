import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ArticleContent from "@/components/articles/ArticleContent";
import LoadingState from "@/components/ui/LoadingState";

const ArticleDetail = () => {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          article_faqs (*),
          article_locations (*),
          article_categories (*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  if (isLoading) return <LoadingState />;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.meta_title}
        description={article.meta_description}
        keywords={article.keywords}
        location={article.article_locations?.[0]?.location || ""}
        category={article.article_categories?.[0]?.category || ""}
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <div className="mb-4 p-4 bg-accent rounded-lg">
            <h3 className="font-bold text-primary mb-2">Article Debug Information:</h3>
            <p className="mb-2"><strong>Article ID:</strong> {article.id}</p>
            <p className="mb-2"><strong>Slug:</strong> {article.slug}</p>
            <p className="mb-2"><strong>Title:</strong> {article.title}</p>
            <p className="mb-2"><strong>Full article object:</strong> {JSON.stringify(article, null, 2)}</p>
          </div>
          
          <h1 className="text-4xl font-bold mb-8 text-primary">{article.title}</h1>
          <ArticleContent content={article.content || ''} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;