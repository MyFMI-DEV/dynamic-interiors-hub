import { Card } from "@/components/ui/card";
import { marked } from "marked";
import FAQs from "./FAQs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useCategoryImage } from "@/hooks/useCategoryImage";
import LocationSearchCard from "./LocationSearchCard";

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
  const [imageError, setImageError] = useState(false);
  const { data: fallbackImage, isLoading: isLoadingFallback } = useCategoryImage(category);

  useEffect(() => {
    setImageError(false);
  }, [categoryImage]);

  const handleImageError = () => {
    console.log('Image failed to load, falling back to new image');
    setImageError(true);
  };

  const displayImage = imageError ? fallbackImage : categoryImage;
  const isImageLoading = isLoadingImage || (imageError && isLoadingFallback);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8 order-1 md:order-none">
          {categoryImage && (
            <Card className="overflow-hidden shadow-lg md:hidden">
              {isImageLoading ? (
                <Skeleton className="w-full aspect-video" />
              ) : displayImage && (
                <img 
                  src={displayImage} 
                  alt={`${category} services in ${location}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
            </Card>
          )}
          <Card className="overflow-hidden shadow-lg bg-white">
            {isLoadingContent ? (
              <div className="p-8 space-y-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="p-8">
                <div className="prose prose-lg max-w-none space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <div 
                      key={index} 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: marked(paragraph) }}
                    />
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div className="space-y-8 order-2">
          {categoryImage && (
            <Card className="overflow-hidden shadow-lg hidden md:block">
              {isImageLoading ? (
                <Skeleton className="w-full aspect-video" />
              ) : displayImage && (
                <img 
                  src={displayImage} 
                  alt={`${category} services in ${location}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
            </Card>
          )}
          <Card className="overflow-hidden shadow-lg bg-white">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Frequently Asked Questions
              </h2>
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
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <LocationSearchCard currentCategory={category} />
      </div>
    </div>
  );
};

export default CategoryContent;