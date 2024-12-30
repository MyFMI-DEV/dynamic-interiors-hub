import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CategoryGridProps {
  categories: string[] | undefined;
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCategoryClick = (category: string) => {
    navigate(`/london/${category.toLowerCase().replace(/\s+/g, '-')}`);
    toast({
      title: "Category Selected",
      description: `Browsing ${category} products and services in London.`,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Interior & Home Categories
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Explore our comprehensive range of interior design and home improvement categories
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <Card 
              key={category} 
              className="group p-8 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary group-hover:text-primary/80 transition-colors">
                {category}
              </h3>
              <p className="text-muted-foreground mb-6">
                Find quality {category.toLowerCase()} products and trusted service providers in your area.
              </p>
              <Button className="w-full bg-accent hover:bg-accent/80 text-primary font-semibold">
                Browse {category}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;