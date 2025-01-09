import { useCreateArticle } from "@/hooks/useCreateArticle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateHarrogateArticle = () => {
  const { mutate: createArticle } = useCreateArticle();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateArticle = () => {
    createArticle({
      title: "Harrogate Home Design: A Perfect Blend of Style",
      slug: "harrogate-home-design-perfect-blend-style",
      description: "Discover the unique charm of Harrogate home design, where traditional elegance meets contemporary style. Learn about local architectural trends, sustainable practices, and luxury elements that make Harrogate homes special.",
      content: `[Content from the .txt file]`, // Full content will be added here
      imageUrl: "https://www.findmyinteriors.co.uk/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png",
      metaTitle: "Harrogate Home Design Guide: Interior Design Trends & Tips",
      metaDescription: "Explore Harrogate's unique home design trends, from traditional architecture to modern interiors. Get expert insights on local design styles, sustainability, and luxury elements.",
      keywords: [
        "Harrogate home design",
        "interior design Harrogate",
        "sustainable home design",
        "luxury homes Harrogate",
        "architectural styles",
        "spa town heritage",
        "home renovation Harrogate",
        "local architects",
        "planning permission",
        "design trends 2025"
      ],
      location: "Harrogate",
      category: "Interior Design",
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
    }, {
      onSuccess: () => {
        toast({
          title: "Article created successfully",
          description: "The Harrogate home design article has been added to the database.",
        });
        navigate("/articles/harrogate-home-design-perfect-blend-style");
      },
      onError: (error) => {
        toast({
          title: "Error creating article",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Harrogate Article</h1>
      <button
        onClick={handleCreateArticle}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Create Article
      </button>
    </div>
  );
};

export default CreateHarrogateArticle;