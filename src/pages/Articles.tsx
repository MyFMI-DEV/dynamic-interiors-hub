import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArticleList } from "@/components/article/ArticleList";

const Articles = () => {
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
        <ArticleList />
      </main>
      <Footer />
    </div>
  );
};

export default Articles;