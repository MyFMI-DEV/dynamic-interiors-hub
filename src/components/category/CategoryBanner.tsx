import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CategoryBannerProps {
  location: string;
  category: string;
}

const CategoryBanner = ({ location, category }: CategoryBannerProps) => {
  // Format location by replacing hyphens with spaces and capitalizing words
  const formattedLocation = location
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Capitalize category
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <Card className="bg-primary text-white p-6 mb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg md:text-xl text-center md:text-left">
            Looking for <span className="font-bold">{formattedCategory}</span> in{" "}
            <span className="font-bold">{formattedLocation}</span>?
            Post an image, URL, or description free today to find the best deals from Interiors experts in your area!
          </div>
          <a 
            href="https://www.findmyinteriors.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="secondary" 
              size="lg"
              className="whitespace-nowrap bg-white text-primary hover:bg-accent hover:text-primary"
            >
              Post Free Today
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default CategoryBanner;