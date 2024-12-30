import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: categories } = useQuery({
    queryKey: ['mainCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('main_category')
        .distinct();
      
      if (error) throw error;
      return data.map(c => c.main_category);
    }
  });

  const handleCategoryClick = (category: string) => {
    navigate(`/london/${category.toLowerCase().replace(' ', '-')}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} services in London.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-12 md:py-24">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png" 
            alt="FindMyInteriors UK" 
            className="h-24 md:h-32 lg:h-40 mx-auto transition-all duration-300 hover:scale-105"
          />
          <h2 className="text-white text-xl md:text-2xl mt-6 text-center font-light">
            Connect with Top Interior Design Professionals in Your Area
          </h2>
        </div>
      </header>

      <nav className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/how-it-works" className="text-primary-foreground hover:text-primary">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/why-choose-us" className="text-primary-foreground hover:text-primary">
                Why Choose Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Find Interior Design Services in the UK
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {categories?.map((category) => (
            <Card 
              key={category} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <p className="text-muted-foreground mb-4">
                Find the best {category.toLowerCase()} professionals in your area.
              </p>
              <Button className="w-full">Browse {category}</Button>
            </Card>
          ))}
        </div>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Locations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool'].map((city) => (
              <Button
                key={city}
                variant="outline"
                onClick={() => navigate(`/${city.toLowerCase()}/all`)}
              >
                {city}
              </Button>
            ))}
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