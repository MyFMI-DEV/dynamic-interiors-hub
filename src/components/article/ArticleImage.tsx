import React, { useEffect } from 'react';
import { useArticleImage } from '@/hooks/useArticleImage';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface ArticleImageProps {
  alt: string;
  articleId: string;
}

export const ArticleImage = ({ alt, articleId }: ArticleImageProps) => {
  const { toast } = useToast();
  const { data: imageUrl, isLoading, error } = useArticleImage(articleId, alt);

  useEffect(() => {
    console.log('ArticleImage mounted:', { alt, articleId });
    console.log('Image state:', { imageUrl, isLoading, error });

    if (error) {
      console.error('Error loading image:', error);
      toast({
        title: "Error loading image",
        description: "There was a problem loading the image. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, imageUrl, isLoading, toast, alt, articleId]);

  if (isLoading) {
    console.log('Showing skeleton for:', alt);
    return (
      <div className="w-full my-8">
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  if (!imageUrl) {
    console.log('No image URL available for:', alt);
    return null;
  }

  // Clean up the image URL to ensure it's in the correct format
  const cleanImageUrl = imageUrl.startsWith('/lovable-uploads') 
    ? imageUrl 
    : `/lovable-uploads/${imageUrl.split('/lovable-uploads/').pop()}`;

  console.log('Final image URL:', cleanImageUrl);

  return (
    <img
      src={cleanImageUrl}
      alt={alt}
      className="w-full aspect-video object-cover rounded-lg my-8"
      onError={(e) => {
        console.error('Image failed to load:', cleanImageUrl);
        toast({
          title: "Image failed to load",
          description: "There was a problem loading the image. Please try again later.",
          variant: "destructive",
        });
      }}
    />
  );
};