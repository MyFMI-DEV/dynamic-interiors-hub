import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LocationCategory = () => {
  const { location, category } = useParams();
  const [content, setContent] = useState<{ title: string; description: string | null }>({
    title: "",
    description: null
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        
        const { data: existingDescription, error } = await supabase
          .from('location_category_descriptions')
          .select('description')
          .eq('location', location?.toLowerCase())
          .eq('category', category?.toLowerCase())
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        // If description exists, use it. Otherwise, use a default description
        const description = existingDescription?.description || 
          `Discover the best ${category} options in ${location}. Our curated selection of interior design products and services will help you create your perfect space. Contact local experts and browse through a wide range of choices to find exactly what you're looking for.`;

        setContent({
          title: `${category} in ${location}`,
          description: description
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Note",
          description: "Using default content while we prepare your personalized description.",
        });
        setContent({
          title: `${category} in ${location}`,
          description: `Explore ${category} options in ${location}. Browse through our selection of interior design products and services.`
        });
      } finally {
        setLoading(false);
      }
    };

    if (location && category) {
      fetchDescription();
    }
  }, [location, category, toast]);

  if (loading) {
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
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-[200px] w-full" />
        </main>
      </div>
    );
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