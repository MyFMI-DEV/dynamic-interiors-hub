import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/layout/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FindMyInteriors UK - Coming Soon | Your Local Interior Design & Home Improvement Directory"
        description="FindMyInteriors.co.uk is under construction. We're working hard to bring you the best interior design and home improvement directory in the UK. Check back soon for updates."
        keywords={["interior design", "home improvement", "coming soon", "under construction", "UK interiors"]}
        location="UK"
        category="All Services"
      />
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
            We're Under Construction
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Please check back for an update soon.
          </p>
          <div className="pt-8">
            <img 
              src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
              alt="FindMyInteriors UK" 
              className="h-24 mx-auto opacity-50"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;