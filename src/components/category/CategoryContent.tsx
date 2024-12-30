import { Card } from "@/components/ui/card";
import { marked } from "marked";
import FAQs from "./FAQs";
import LocationSearchCard from "./LocationSearchCard";

interface CategoryContentProps {
  categoryImage: string | undefined;
  category: string;
  location: string;
  paragraphs: string[];
}

const CategoryContent = ({ categoryImage, category, location, paragraphs }: CategoryContentProps) => {
  return (
    <div className="space-y-8">
      <LocationSearchCard currentCategory={category} />
      
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryImage && (
            <div className="flex items-center justify-center">
              <img 
                src={categoryImage} 
                alt={`${category} services in ${location}`}
                className="w-1/2 mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="prose max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
              />
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <FAQs category={category} location={location} />
      </Card>
    </div>
  );
};

export default CategoryContent;