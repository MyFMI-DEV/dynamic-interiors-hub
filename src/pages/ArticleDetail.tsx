import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ArticleContent from "@/components/articles/ArticleContent";
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
      
      // Transform FAQs into the required format
      const faqs = data.article_faqs?.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })) || [];

      // Add trends data for Harrogate home design
      const trends = [
        { label: "Sustainable Design", value: 85 },
        { label: "Smart Home Tech", value: 75 },
        { label: "Local Materials", value: 70 },
        { label: "Spa Inspired", value: 65 }
      ];

      // Define key points from the content
      const keyPoints = [
        "Harrogate is a spa town known for its historical architecture",
        "Home design trends blend traditional and contemporary styles",
        "Sustainability is a key focus in local home designs",
        "The local cultural scene influences interior aesthetics"
      ];

      // Define table data
      const tableData = [
        { key: "Population", value: "75,070 (2016)" },
        { key: "Architectural Styles", value: "Victorian, Edwardian, and contemporary designs" },
        { key: "Sustainability", value: "Focus on eco-friendly materials and designs" },
        { key: "Cultural Influences", value: "Rich artistic scene impacting design choices" }
      ];

      // Define images
      const images = [
        {
          url: "/lovable-uploads/harrogate-victorian.png",
          alt: "Victorian architecture in Harrogate",
          title: "Classic Victorian architecture showcasing Harrogate's historical charm"
        },
        {
          url: "/lovable-uploads/harrogate-modern.png",
          alt: "Modern home design in Harrogate",
          title: "Contemporary home design incorporating sustainable elements"
        },
        {
          url: "/lovable-uploads/harrogate-interior.png",
          alt: "Luxury interior design in Harrogate",
          title: "Elegant interior showcasing local design trends"
        },
        {
          url: "/lovable-uploads/harrogate-sustainable.png",
          alt: "Sustainable home features",
          title: "Eco-friendly design elements in modern Harrogate homes"
        }
      ];

      return {
        ...data,
        keyPoints,
        tableData,
        images,
        faqs,
        trends
      };
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
        <ArticleTemplate
          title={article.title}
          content={article.content}
          keyPoints={article.keyPoints}
          tableData={article.tableData}
          images={article.images}
          faqs={article.faqs}
          trends={article.trends}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;