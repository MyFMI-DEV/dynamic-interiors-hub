import { Card } from "@/components/ui/card";
import { marked } from "marked";
import FAQs from "./FAQs";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryContentProps {
  categoryImage: string | undefined;
  category: string;
  location: string;
  paragraphs: string[];
  isLoadingContent?: boolean;
  isLoadingImage?: boolean;
  isLoadingFAQs?: boolean;
}

const CategoryContent = ({ 
  categoryImage, 
  category, 
  location, 
  paragraphs,
  isLoadingContent = false,
  isLoadingImage = false,
  isLoadingFAQs = false 
}: CategoryContentProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8 order-1 md:order-none">
          {categoryImage && (
            <Card className="p-6 md:hidden">
              {isLoadingImage ? (
                <Skeleton className="w-full aspect-video rounded-lg" />
              ) : (
                <img 
                  src={categoryImage} 
                  alt={`${category} services in ${location}`}
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </Card>
          )}
          <Card className="p-6 h-fit">
            {isLoadingContent ? (
              <div className="space-y-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="prose max-w-none space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <div 
                    key={index} 
                    className="text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
        
        <div className="space-y-8 order-2">
          {categoryImage && (
            <Card className="p-6 hidden md:block">
              {isLoadingImage ? (
                <Skeleton className="w-full aspect-video rounded-lg" />
              ) : (
                <img 
                  src={categoryImage} 
                  alt={`${category} services in ${location}`}
                  className="w-full rounded-lg shadow-lg"
                />
              )}
            </Card>
          )}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            {isLoadingFAQs ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <FAQs category={category} location={location} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;