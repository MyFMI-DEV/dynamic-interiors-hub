import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { ArticleTemplate } from "@/components/articles/ArticleTemplate";
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

  // Prepare the data for ArticleTemplate
  const images = article.image_url ? [
    {
      url: article.image_url,
      alt: article.title
    }
  ] : [];

  const faqs = article.article_faqs?.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })) || [];

  const keyPoints = article.keywords || [];

  const tableData = [
    { key: "Location", value: article.article_locations?.[0]?.location || "All Locations" },
    { key: "Category", value: article.article_categories?.[0]?.category || "General" }
  ];

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
        <ArticleTemplate
          title={article.title}
          content={article.content}
          keyPoints={keyPoints}
          tableData={tableData}
          images={images}
          faqs={faqs}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;