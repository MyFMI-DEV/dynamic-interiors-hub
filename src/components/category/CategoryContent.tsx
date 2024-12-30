import { Card } from "@/components/ui/card";
import { marked } from "marked";
import FAQs from "./FAQs";

interface CategoryContentProps {
  categoryImage: string | undefined;
  category: string;
  location: string;
  paragraphs: string[];
}

const CategoryContent = ({ categoryImage, category, location, paragraphs }: CategoryContentProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 h-fit order-1 md:order-none">
          <div className="prose max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
              />
            ))}
          </div>
        </Card>
        
        <div className="space-y-8 order-2 md:order-none">
          {categoryImage && (
            <Card className="p-6">
              <img 
                src={categoryImage} 
                alt={`${category} services in ${location}`}
                className="w-full rounded-lg shadow-lg"
              />
            </Card>
          )}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <FAQs category={category} location={location} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;