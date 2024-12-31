import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
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
      <SEOHead
        title="FindMyInteriors UK - Your Local Interior Design & Home Improvement Directory"
        description="Discover local interior designers, home improvement specialists, and furniture suppliers across the UK. Get expert advice and find the perfect professionals for your home projects."
        keywords={["interior design", "home improvement", "local designers", "furniture", "UK interiors", "home renovation", "interior specialists"]}
        location="UK"
        category="All Services"
      />
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