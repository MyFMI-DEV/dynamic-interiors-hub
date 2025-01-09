import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ArticlesList from "@/components/articles/ArticlesList";

const Articles = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Interior Design Articles & Guides | FindMyInteriors UK"
        description="Explore expert interior design articles, guides, and tips for transforming your home. Get professional insights on interior design trends, home improvement, and local design services across the UK."
        keywords={["interior design articles", "home improvement guides", "interior design tips", "UK interior design", "home decoration guides", "interior design trends"]}
        location="UK"
        category="Articles"
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Interior Design Articles & Guides</h1>
        <ArticlesList />
      </main>
      <Footer />
    </div>
  );
};

export default Articles;