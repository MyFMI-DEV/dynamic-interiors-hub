import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ['mainCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category')
        .order('main_category');
      
      if (error) throw error;
      
      return [...new Set(data.map(c => c.main_category))];
    }
  });

  const { data: locations } = useQuery({
    queryKey: ['mainLocations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('main_location')
        .order('main_location');
      
      if (error) throw error;
      
      return [...new Set(data.map(l => l.main_location))];
    }
  });

  const handleCategoryClick = (category: string) => {
    navigate(`/london/${category.toLowerCase().replace(/\s+/g, '-')}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} products and services in London.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="relative bg-primary py-12 md:py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/13058f80-e0ed-415e-9dac-d36d661617c5.png" 
            alt="Modern interior design" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-24 md:h-32 lg:h-40 mx-auto transition-all duration-300 hover:scale-105"
          />
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mt-8 text-center font-bold">
            Discover Premium Home & Interior Solutions Near You
          </h1>
          <p className="text-white text-xl md:text-2xl mt-4 text-center font-light">
            Connect with Trusted Suppliers, Retailers, and Service Providers Today
          </p>
        </div>
      </header>

      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our Interior & Home Categories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <Card 
                key={category} 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(category)}
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <p className="text-muted-foreground mb-4">
                  Find quality {category.toLowerCase()} products and trusted service providers in your area.
                </p>
                <Button className="w-full">Browse {category}</Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Available Locations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {locations?.map((city) => (
              <Button
                key={city}
                variant="outline"
                onClick={() => navigate(`/${city.toLowerCase()}/all`)}
                className="text-lg"
              >
                {city}
              </Button>
            ))}
          </div>
        </section>

        <section className="bg-secondary/10 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose FindMyInteriors?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Verified Providers</h3>
              <p>All our suppliers and service providers are thoroughly vetted and reviewed.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Free Consultation</h3>
              <p>Get free initial consultations with your chosen providers.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
              <p>Find providers who understand your local market and preferences.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} FindMyInteriors UK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;