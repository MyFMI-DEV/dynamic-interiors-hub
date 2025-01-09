import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ArticlesList from "@/components/articles/ArticlesList";
import { useCreateArticle } from "@/hooks/useCreateArticle";
import { toast } from "sonner";

const Articles = () => {
  const createHarrogateArticle = async () => {
    const { mutateAsync: createArticle } = useCreateArticle();

    try {
      await createArticle({
        title: "Harrogate Home Design: A Perfect Blend of Style",
        slug: "harrogate-home-design-perfect-blend-style",
        description: "Discover the unique charm of Harrogate home design, where historical architecture meets contemporary style. Learn about sustainable practices, luxury elements, and local design trends.",
        content: `[Your provided HTML content]`,
        imageUrl: "https://www.findmyinteriors.co.uk/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png",
        metaTitle: "Harrogate Home Design Guide: Interior Design Trends & Tips",
        metaDescription: "Explore Harrogate's home design trends, from sustainable practices to luxury elements. Get expert insights on local architecture and interior design services.",
        keywords: ["Harrogate home design", "interior design Harrogate", "sustainable home design", "luxury homes Harrogate", "architectural styles Harrogate"],
        location: "Harrogate",
        category: "Home Design",
        faqs: [
          {
            question: "What are the key characteristics of Harrogate home design?",
            answer: "Harrogate home design is characterized by a blend of historical and contemporary styles, a focus on sustainability, and an influence from the local cultural scene."
          },
          {
            question: "How do I incorporate sustainable design elements in my Harrogate home?",
            answer: "To incorporate sustainable elements, consider using eco-friendly materials, energy-efficient appliances, and designs that maximize natural light and ventilation."
          },
          {
            question: "What should I consider when seeking planning permission for a home renovation in Harrogate?",
            answer: "It's crucial to understand local regulations, engage with local authorities early, and ensure that your project complies with planning guidelines."
          },
          {
            question: "How does Harrogate's climate influence local home design trends?",
            answer: "Harrogate's climate, with its moderate temperatures and rainfall, encourages designs that prioritize insulation, natural light, and energy efficiency."
          },
          {
            question: "Where can I find reputable interior designers and architects in Harrogate?",
            answer: "A great starting point is to explore local directories and websites, such as Find My Interiors and Houzz."
          }
        ]
      });

      toast.success("Article created successfully!");
    } catch (error) {
      console.error("Error creating article:", error);
      toast.error("Failed to create article");
    }
  };

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