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
        
        // First try to fetch from Supabase using maybeSingle() instead of single()
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

        if (existingDescription) {
          setContent({
            title: `${category} in ${location}`,
            description: existingDescription.description
          });
          setLoading(false);
          return;
        }

        // If no description exists, generate new one
        const response = await fetch('/functions/v1/generate-description', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            location: location?.toLowerCase(), 
            category: category?.toLowerCase() 
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate description');
        }

        const data = await response.json();
        setContent({
          title: `${category} in ${location}`,
          description: data.description
        });
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to load content. Please try again later.",
          variant: "destructive",
        });
        setContent({
          title: `${category} in ${location}`,
          description: "We're having trouble loading this content right now. Please check back later."
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