import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoadingState from "@/components/ui/LoadingState";

interface Location {
  main_location: string;
  sub_location: string;
}

interface Category {
  sub_category: string;
}

const LocationList = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all locations including sub-locations
        const { data: locationsData } = await supabase
          .from('locations')
          .select('main_location, sub_location');

        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('sub_category');

        if (locationsData && categoriesData) {
          // Remove duplicates
          const uniqueLocations = locationsData.filter((location, index, self) =>
            index === self.findIndex((l) => 
              l.main_location === location.main_location && 
              l.sub_location === location.sub_location
            )
          );
          const uniqueCategories = categoriesData.filter((category, index, self) =>
            index === self.findIndex((c) => c.sub_category === category.sub_category)
          );

          setLocations(uniqueLocations);
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatUrl = (location: Location, category: string) => {
    const locationPath = `${location.main_location.toLowerCase()}-${location.sub_location.toLowerCase()}`.replace(/\s+/g, '-');
    const categoryPath = category.toLowerCase().replace(/\s+/g, '-');
    return `/${locationPath}/${categoryPath}`;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">All Location/Category Combinations</h1>
        
        <Card className="p-6">
          <div className="space-y-8">
            {locations.map((location) => (
              <div key={`${location.main_location}-${location.sub_location}`} className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  {location.main_location} - {location.sub_location}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={`${location.main_location}-${location.sub_location}-${category.sub_category}`}
                      to={formatUrl(location, category.sub_category)}
                      className="p-3 bg-accent hover:bg-primary hover:text-white rounded-lg transition-colors"
                    >
                      {category.sub_category}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default LocationList;