import { Card } from "@/components/ui/card";

interface CategoryContentProps {
  categoryImage: string | undefined;
  category: string;
  location: string;
  paragraphs: string[];
}

const CategoryContent = ({ categoryImage, category, location, paragraphs }: CategoryContentProps) => {
  return (
    <Card className="p-6 mb-8">
      {categoryImage && (
        <div className="mb-8">
          <img 
            src={categoryImage} 
            alt={`${category} services in ${location}`}
            className="w-full h-auto rounded-lg shadow-lg"
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
    </Card>
  );
};

export default CategoryContent;