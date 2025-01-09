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
          article_categories (*),
          article_images (*)
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

  // Extract key points from content (only from the first ul element)
  const keyPointsMatch = article.content.match(/<ul>[\s\S]*?<\/ul>/);
  const keyPoints = keyPointsMatch
    ? Array.from(keyPointsMatch[0].matchAll(/<li>(.*?)<\/li>/g)).map(match => match[1])
    : [];

  // Remove the key points section from the content to avoid duplication
  const contentWithoutKeyPoints = article.content.replace(/<ul>[\s\S]*?<\/ul>/, '');

  // Extract table data from content
  const tableMatch = contentWithoutKeyPoints.match(/<table>[\s\S]*?<\/table>/);
  const tableData = tableMatch
    ? Array.from(tableMatch[0].matchAll(/<tr>\s*<td>(.*?)<\/td>\s*<td>(.*?)<\/td>\s*<\/tr>/g))
        .map(match => ({
          key: match[1],
          value: match[2]
        }))
    : [];

  // Combine main article image with article_images
  const images = [
    ...(article.image_url ? [{ url: article.image_url, alt: article.title }] : []),
    ...(article.article_images || [])
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
          content={contentWithoutKeyPoints}
          keyPoints={keyPoints}
          tableData={tableData}
          images={images}
          faqs={article.article_faqs || []}
          trends={[
            { label: "Timeless Designs", value: 42 },
            { label: "Indoor Swings", value: 35 },
            { label: "Curved Edges", value: 23 },
            { label: "Bold Colors", value: 45 }
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;