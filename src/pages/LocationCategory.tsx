import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LocationCategory = () => {
  const { location, category } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here we'll add the content generation logic with OpenAI and Pixabay
    // For now, we'll just simulate loading
    setTimeout(() => {
      setLoading(false);
      setContent({
        title: `${category} in ${location}`,
        description: "Sample description...",
      });
    }, 1000);
  }, [location, category]);

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-16 mx-auto"
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-8">
          {content.title}
        </h1>

        <Card className="p-6 mb-8">
          <div className="prose max-w-none">
            {content.description}
          </div>
        </Card>
      </main>

      <footer className="bg-primary text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LocationCategory;