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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Image and Search Card */}
        <div className="lg:col-span-4 space-y-8">
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
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{category.replace(/-/g, ' ')} in {location.replace(/-/g, ' ')}</h2>
              <p className="text-muted-foreground">
                Find the best {category.replace(/-/g, ' ')} services and providers in {location.replace(/-/g, ' ')}.
              </p>
            </div>
          </Card>
        </div>

        {/* Right column - Content */}
        <div className="lg:col-span-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {paragraphs.map((paragraph, index) => (
                <div 
                  key={index} 
                  className={`text-lg leading-relaxed ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <FAQs category={category} location={location} />
      </Card>
    </div>
  );
};

export default CategoryContent;