import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import LocationGrid from "@/components/home/LocationGrid";
import Features from "@/components/home/Features";

const Index = () => {
  const { data: categories } = useQuery({
    queryKey: ['mainCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category')
        .order('main_category');
      
      if (error) throw error;
      
      // Get unique main categories
      const uniqueCategories = [...new Set(data.map(c => c.main_category))];
      return uniqueCategories;
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

  return (
    <div className="min-h-screen bg-background">
      <Hero backgroundImage="/lovable-uploads/13058f80-e0ed-415e-9dac-d36d661617c5.png" />
      <Navigation />
      <main>
        <CategoryGrid categories={categories} />
        <LocationGrid locations={locations} />
        <Features />
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