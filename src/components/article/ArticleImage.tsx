import React, { useEffect, useRef } from 'react';
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
    if (error) {
      console.error('Error loading image:', error);
      toast({
        title: "Error loading image",
        description: "There was a problem loading the image. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="w-full my-8">
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  return imageUrl ? (
    <img
      src={imageUrl}
      alt={alt}
      className="w-full aspect-video object-cover rounded-lg my-8"
    />
  ) : null;
};