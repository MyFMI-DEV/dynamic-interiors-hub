import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

const PostFree = () => {
  return (
    <>
      <SEOHead
        title="Post Your Interior Services - Free Listing on FindMyInteriors UK"
        description="List your interior design services, products, or solutions for free on FindMyInteriors UK. Connect with potential customers in your local area and grow your business."
        keywords={["post services", "free listing", "interior business", "local marketing", "UK directory", "business promotion"]}
        location="UK"
        category="Business Services"
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Post Your Services For Free
          </h1>
          <p className="text-center text-lg mb-8">
            Coming soon! You'll be able to post your interior design services, products, and solutions here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostFree;