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
  );
};

export default CategoryGrid;