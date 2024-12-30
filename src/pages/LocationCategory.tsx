import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Category {
  main_category: string;
  sub_categories: string[];
}

const LocationCategory = () => {
  const { location, category } = useParams();
  const [content, setContent] = useState<{ title: string; description: string | null }>({
    title: "",
    description: null
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('main_category, sub_category')
          .order('main_category', { ascending: true });

        if (error) throw error;

        // Group by main category
        const groupedCategories = data.reduce((acc: Category[], curr) => {
          const existingCategory = acc.find(c => c.main_category === curr.main_category);
          if (existingCategory) {
            existingCategory.sub_categories.push(curr.sub_category);
          } else {
            acc.push({
              main_category: curr.main_category,
              sub_categories: [curr.sub_category]
            });
          }
          return acc;
        }, []);

        setCategories(groupedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [toast]);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        
        // First, check if the location exists
        const { data: existingLocation, error: locationError } = await supabase
          .from('locations')
          .select('id')
          .eq('main_location', location)
          .eq('sub_location', 'City Centre')
          .maybeSingle();

        if (locationError) throw locationError;

        // If location doesn't exist in the database, we'll use default content
        if (!existingLocation) {
          setContent({
            title: `${category} in ${location}`,
            description: `Discover the best ${category} options in ${location}. Our curated selection of interior design products and services will help you create your perfect space. Contact local experts and browse through a wide range of choices to find exactly what you're looking for.`
          });
          setLoading(false);
          return;
        }

        // If location exists, fetch the description
        const { data: existingDescription, error } = await supabase
          .from('location_category_descriptions')
          .select('description')
          .eq('location', location?.toLowerCase())
          .eq('category', category?.toLowerCase())
          .maybeSingle();

        if (error) throw error;

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

  if (loading || loadingCategories) {
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

        <div className="mt-8">
          <Tabs defaultValue={categories[0]?.main_category} className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.main_category}
                  value={cat.main_category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  {cat.main_category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat.main_category} value={cat.main_category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.sub_categories.map((subCat) => (
                    <Link
                      key={subCat}
                      to={`/${location}/${subCat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="p-4 bg-accent rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      {subCat}
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
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