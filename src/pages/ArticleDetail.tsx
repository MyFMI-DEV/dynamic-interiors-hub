import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { ArticleTemplate } from "@/components/articles/ArticleTemplate";
import LoadingState from "@/components/ui/LoadingState";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  console.log("Current slug:", slug);

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!slug) {
        console.error("No slug provided");
        throw new Error("No slug provided");
      }

      console.log("Fetching article with slug:", slug);
      
      const { data: articles, error: queryError } = await supabase
        .from('articles')
        .select(`
          *,
          article_faqs (*),
          article_locations (*),
          article_categories (*),
          article_images (*)
        `)
        .eq('slug', 'harrogate-home-design')
        .maybeSingle();

      console.log("Query result:", { articles, queryError });

      if (queryError) {
        console.error("Database query error:", queryError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load article. Please try again later.",
        });
        throw queryError;
      }
      
      if (!articles) {
        console.error("No article found with slug:", slug);
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "The article you're looking for doesn't exist.",
        });
        return null;
      }

      console.log("Found article:", articles);
      return articles;
    },
    enabled: !!slug,
    retry: false
  });

  if (isLoading) return <LoadingState />;
  if (!article) return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Article Not Found</h1>
          <p className="text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  // Extract key points from content
  const keyPointsMatch = article.content.match(/<ul>[\s\S]*?<\/ul>/);
  const keyPoints = keyPointsMatch
    ? Array.from(keyPointsMatch[0].matchAll(/<li>(.*?)<\/li>/g)).map(match => match[1])
    : [];

  // Remove the key points section from the content
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
    ...(article.article_images || []).map(img => ({
      url: img.url,
      alt: img.alt || article.title
    }))
  ];

  console.log("Processed images:", images);

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