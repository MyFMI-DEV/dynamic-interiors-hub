import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import LocationGrid from "@/components/home/LocationGrid";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";

const Index = () => {
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
        <CategoryGrid />
        <Features />
        <LocationGrid locations={locations} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;