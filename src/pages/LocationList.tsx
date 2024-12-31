import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
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

interface GroupedLocations {
  [key: string]: string[];
}

const LocationList = () => {
  const [groupedLocations, setGroupedLocations] = useState<GroupedLocations>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationMap, setLocationMap] = useState<Record<string, Location[]>>({});

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
          // Group locations by main location
          const grouped = locationsData.reduce((acc: GroupedLocations, location) => {
            if (!acc[location.main_location]) {
              acc[location.main_location] = [];
            }
            if (!acc[location.main_location].includes(location.sub_location)) {
              acc[location.main_location].push(location.sub_location);
            }
            return acc;
          }, {});

          // Create a map of main locations to their full location objects
          const locMap = locationsData.reduce((acc: Record<string, Location[]>, location) => {
            if (!acc[location.main_location]) {
              acc[location.main_location] = [];
            }
            acc[location.main_location].push(location);
            return acc;
          }, {});

          const uniqueCategories = categoriesData.filter((category, index, self) =>
            index === self.findIndex((c) => c.sub_category === category.sub_category)
          );

          setGroupedLocations(grouped);
          setLocationMap(locMap);
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

  const formatUrl = (mainLocation: string, subLocation: string, category: string) => {
    const locationPath = `${mainLocation.toLowerCase()}-${subLocation.toLowerCase()}`.replace(/\s+/g, '-');
    const categoryPath = category.toLowerCase().replace(/\s+/g, '-');
    return `/${locationPath}/${categoryPath}`;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="All Locations - FindMyInteriors UK Service Directory"
        description="Browse interior design services across all UK locations. Find local interior designers, suppliers, and home improvement specialists in your area."
        keywords={["UK locations", "local services", "interior design", "home improvement", "area directory", "find services"]}
        location="UK"
        category="Locations Directory"
      />
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">All Locations</h1>
        
        <Card className="p-6">
          <div className="space-y-8">
            {Object.entries(groupedLocations).map(([mainLocation, subLocations]) => (
              <div key={mainLocation} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-2xl font-semibold">
                    {mainLocation}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Including: {subLocations.join(', ')}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    subLocations.map((subLocation) => (
                      <Link
                        key={`${mainLocation}-${subLocation}-${category.sub_category}`}
                        to={formatUrl(mainLocation, subLocation, category.sub_category)}
                        className="p-3 bg-accent hover:bg-primary hover:text-white rounded-lg transition-colors"
                      >
                        {category.sub_category} in {subLocation}
                      </Link>
                    ))
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