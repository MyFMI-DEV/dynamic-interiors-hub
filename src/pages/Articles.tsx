import { useQuery } from "@tanstack/react-query";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { fetchAllArticles } from "@/lib/articleUtils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Articles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchAllArticles
  });

  const defaultImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse">Loading articles...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Interior Design Articles & Guides | FindMyInteriors UK"
        description="Discover expert insights, tips, and guides about interior design across the UK. Read our curated articles about home improvement and design trends."
        keywords={["interior design articles", "home improvement guides", "UK interiors blog", "design tips"]}
        location="UK"
        category="Articles"
      />
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Interior Design Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
              <Link to={`/articles/${article.slug}`} className="block">
                <AspectRatio ratio={16/9} className="bg-muted">
                  <img 
                    src={article.image_url || defaultImage} 
                    alt={article.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-primary hover:text-primary/80 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 text-sm">
                    {article.meta_description}
                  </p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </CardContent>
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