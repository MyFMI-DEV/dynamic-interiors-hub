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
          article_faqs (
            question,
            answer
          ),
          article_locations (
            location
          ),
          article_categories (
            category
          )
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

  // Transform the data to match ArticleTemplate props
  const templateData = {
    title: article.title,
    content: article.content,
    keyPoints: article.keywords || [],
    tableData: [
      { key: "Published", value: new Date(article.published_at).toLocaleDateString() },
      { key: "Category", value: article.article_categories?.[0]?.category || "General" },
      { key: "Location", value: article.article_locations?.[0]?.location || "UK" }
    ],
    images: [
      { url: article.image_url || "", alt: article.title },
      // Add placeholder images that will be generated
      { url: "", alt: "Living Room Design" },
      { url: "", alt: "Interior Styling" },
      { url: "", alt: "Home Decoration" }
    ],
    faqs: article.article_faqs?.map(faq => ({
      question: faq.question,
      answer: faq.answer
    })) || [],
    trends: [
      { label: "Modern", value: 85 },
      { label: "Traditional", value: 60 },
      { label: "Contemporary", value: 75 },
      { label: "Minimalist", value: 90 }
    ]
  };

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
        <ArticleTemplate {...templateData} />
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;