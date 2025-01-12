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

  // Default fallback image from Unsplash
  const fallbackImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800";

  if (isLoading) {
    return (
      <div className="w-full my-8">
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  return (
    <img
      src={alt || fallbackImage}
      alt="Interior design"
      className="w-full aspect-video object-cover rounded-lg my-8"
      onLoad={() => setIsLoading(false)}
      onError={(e) => {
        console.error('Image failed to load:', alt);
        setIsLoading(false);
        (e.target as HTMLImageElement).src = fallbackImage;
        toast({
          title: "Using fallback image",
          description: "The original image couldn't be loaded. Using a default image instead.",
          variant: "destructive",
        });
      }}
    />
  );
};