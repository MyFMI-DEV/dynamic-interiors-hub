import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Articles = () => {
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Interior Design Articles & Guides | FindMyInteriors UK"
        description="Discover expert insights, tips, and guides about interior design across the UK. Read our curated articles about home improvement and design trends."
        keywords={["interior design articles", "home improvement guides", "UK interiors blog", "design tips"]}
        location="UK"
        category="Articles"
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Interior Design Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/articles/${article.slug}`} className="block p-6">
                <h2 className="text-2xl font-semibold mb-3 text-primary hover:text-primary/80 transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3">
                  {article.meta_description}
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  {new Date(article.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;