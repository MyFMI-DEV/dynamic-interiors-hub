import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface ArticleImageProps {
  alt: string;
  articleId: string;
}

export const ArticleImage = ({ alt, articleId }: ArticleImageProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);
  const [imageSrc, setImageSrc] = React.useState<string>('');

  // Collection of relevant interior design images from Unsplash
  const defaultImages = {
    living: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800",
    bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
    bathroom: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800",
    office: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800",
    default: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800"
  };

  // Select relevant image based on alt text content
  const getFallbackImage = (altText: string) => {
    const text = altText.toLowerCase();
    if (text.includes('living')) return defaultImages.living;
    if (text.includes('kitchen')) return defaultImages.kitchen;
    if (text.includes('bedroom')) return defaultImages.bedroom;
    if (text.includes('bathroom')) return defaultImages.bathroom;
    if (text.includes('office')) return defaultImages.office;
    return defaultImages.default;
  };

  React.useEffect(() => {
    console.log('Setting up image with alt:', alt);
    // Initialize image source
    const initialSrc = alt || getFallbackImage(alt);
    setImageSrc(initialSrc);
    console.log('Initial image source set to:', initialSrc);
  }, [alt]);

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', imageSrc);
    setIsLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', imageSrc);
    const fallbackSrc = getFallbackImage(alt);
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