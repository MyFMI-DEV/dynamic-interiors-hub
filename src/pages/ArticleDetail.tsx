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

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      
      const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load article. Please try again later.",
        });
        throw error;
      }
      
      if (!article) {
        toast({
          variant: "destructive",
          title: "Not Found",
          description: "The article you're looking for doesn't exist.",
        });
        return null;
      }

      return article;
    },
    enabled: !!slug
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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.meta_title}
        description={article.meta_description}
        keywords={article.keywords}
        location=""
        category=""
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ArticleTemplate
          title={article.title}
          content={article.content}
          imageUrl={article.image_url}
          articleId={article.id}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;