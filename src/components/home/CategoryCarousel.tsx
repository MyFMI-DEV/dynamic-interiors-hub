import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoryCarouselProps {
  categories: string[] | undefined;
  onCategoryClick: (category: string) => void;
}

const CategoryCarousel = ({ categories, onCategoryClick }: CategoryCarouselProps) => {
  return (
    <div className="relative w-full max-w-[95vw] mx-auto px-4 md:px-8">
      <Carousel 
        className="w-full" 
        opts={{ 
          align: "start",
          loop: true,
          skipSnaps: false,
          containScroll: "trimSnaps"
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories?.map((category) => (
            <CarouselItem 
              key={category} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card 
                className="group p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between"
                onClick={() => onCategoryClick(category)}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary/80 transition-colors">
                    {category}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Find quality {category.toLowerCase()} products and trusted service providers in your area.
                  </p>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/80 text-primary font-semibold">
                  Browse {category}
                </Button>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;