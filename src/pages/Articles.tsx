import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import ArticlesList from "@/components/articles/ArticlesList";
import { useCreateArticle } from "@/hooks/useCreateArticle";
import { toast } from "sonner";

const Articles = () => {
  const { mutateAsync: createArticle } = useCreateArticle();

  const createHarrogateArticle = async () => {
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
        ],
        images: [
          { url: "https://www.findmyinteriors.co.uk/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png", alt: "Interior Design Services" },
          { url: "https://www.findmyinteriors.co.uk/lovable-uploads/42ffcb97-aa24-47f0-834e-33757c6f5cae.png", alt: "Local Expertise" },
          { url: "https://www.findmyinteriors.co.uk/lovable-uploads/b47542a6-4411-407e-8cb4-28a1ca0f5371.png", alt: "Architectural Styles" },
          { alt: "Home Categories" },
          { alt: "Climate-Responsive Design" },
          { alt: "Sustainable Solutions" },
          { alt: "Spa-Inspired Interiors" },
          { alt: "Luxury Home Design" },
          { alt: "Eco-Friendly Design" },
          { alt: "Sustainable Home Solutions" },
          { alt: "Luxury Home Design" },
          { alt: "High-End Interiors" },
          { alt: "Local Architects" },
          { alt: "Architectural Services" },
          { alt: "Design Trends" },
          { alt: "Home Styling" },
          { alt: "Planning Permissions" },
          { alt: "Local Regulations" },
          { alt: "Home Renovation" },
          { alt: "Remodeling Services" },
          { alt: "Cultural Influences in Design" },
          { alt: "Local Art Integration" },
          { alt: "Future Design Trends" },
          { alt: "Sustainable Home Solutions" }
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
        <button
          onClick={createHarrogateArticle}
          className="mb-8 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Create Harrogate Article
        </button>
        <ArticlesList />
      </main>
      <Footer />
    </div>
  );
};

export default Articles;