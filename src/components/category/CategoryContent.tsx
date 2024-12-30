import { Card } from "@/components/ui/card";
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
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryImage && (
            <div className="flex items-center justify-center">
              <img 
                src={categoryImage} 
                alt={`${category} services in ${location}`}
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="prose max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
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