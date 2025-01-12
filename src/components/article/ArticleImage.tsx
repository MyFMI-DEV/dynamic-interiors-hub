import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getRelevantImage } from '@/utils/imageUtils';

interface ArticleImageProps {
  alt: string;
  articleId: string;
}

export const ArticleImage = ({ alt, articleId }: ArticleImageProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [imageSrc, setImageSrc] = React.useState<string>('');

  React.useEffect(() => {
    console.log('Setting up image with alt:', alt);
    const initialSrc = alt || getRelevantImage(alt);
    setImageSrc(initialSrc);
    console.log('Initial image source set to:', initialSrc);
  }, [alt]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', imageSrc);
    const fallbackSrc = getRelevantImage(alt);
    console.log('Using fallback image:', fallbackSrc);
    setImageSrc(fallbackSrc);
    setIsLoading(false);
    toast({
      title: "Using fallback image",
      description: "The original image couldn't be loaded. Using a relevant default image instead.",
      variant: "destructive",
    });
  };

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