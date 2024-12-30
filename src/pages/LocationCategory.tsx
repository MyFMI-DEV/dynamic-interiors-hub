import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocationData } from "@/hooks/useLocationData";
import { useLocationDescription } from "@/hooks/useLocationDescription";
import { useSEOMetadata } from "@/hooks/useSEOMetadata";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";

const LocationCategory = () => {
  const { location, category } = useParams();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { toast } = useToast();

  const { data: locationData, isLoading: isLoadingLocation } = useLocationData(location);
  const { data: description, isLoading: isLoadingDescription } = useLocationDescription(location, category);
  const { data: seoMetadata, isLoading: isLoadingSEO } = useSEOMetadata(location, category);
  const { data: categoryImage, isLoading: isLoadingImage } = useCategoryImage(category);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('main_category, sub_category')
          .order('main_category', { ascending: true });

        if (error) throw error;

        const groupedCategories = data.reduce((acc, curr) => {
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

  const isLoading = isLoadingLocation || isLoadingDescription || isLoadingSEO || loadingCategories || isLoadingImage;

  if (isLoading) {
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
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-[200px] w-full" />
        </main>
      </div>
    );
  }

  // Split description into paragraphs
  const paragraphs = description?.split('\n\n') || [];

  return (
    <div className="min-h-screen bg-background">
      {seoMetadata && (
        <SEOHead
          title={seoMetadata.meta_title}
          description={seoMetadata.meta_description}
          keywords={seoMetadata.keywords}
          location={location || ''}
          category={category || ''}
        />
      )}

      <header className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-16 mx-auto"
          />
        </div>
      </header>

      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-8">
          {category} in {location}
        </h1>

        <Card className="p-6 mb-8">
          {categoryImage && (
            <div className="mb-8">
              <img 
                src={categoryImage} 
                alt={`${category} services in ${location}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="prose max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
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
