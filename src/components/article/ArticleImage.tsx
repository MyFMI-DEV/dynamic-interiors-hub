import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useArticleImage } from '@/hooks/useArticleImage';

interface ArticleImageProps {
  alt: string;
  articleId: string;
}

export const ArticleImage = ({ alt, articleId }: ArticleImageProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  
  const { data: imageSrc } = useArticleImage(articleId, alt);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error('Image failed to load:', imageSrc);
    setIsLoading(false);
    toast({
      title: "Image loading error",
      description: "The image couldn't be loaded. Using a fallback image instead.",
      variant: "destructive",
    });
  };

  if (!imageSrc) {
    return null;
  }

  return (
    <div className="w-full my-8">
      {isLoading && <Skeleton className="w-full h-64" />}
      <img
        src={imageSrc}
        alt={alt || "Interior design"}
        className={`w-full aspect-video object-cover rounded-lg ${isLoading ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};