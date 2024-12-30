import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

const PostFree = () => {
  return (
    <>
      <Helmet>
        <title>Post Free - FindMyInteriors UK</title>
        <meta 
          name="description" 
          content="Post your interior design services, products, or solutions for free on FindMyInteriors UK. Connect with potential customers in your area."
        />
      </Helmet>
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