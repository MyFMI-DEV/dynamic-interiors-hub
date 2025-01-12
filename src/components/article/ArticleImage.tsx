import React from 'react';
import { useArticleImage } from '@/hooks/useArticleImage';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface ArticleImageProps {
  alt: string;
  articleId: string;
}

export const ArticleImage = ({ alt, articleId }: ArticleImageProps) => {
  const { toast } = useToast();
  const { data: imageUrl, isLoading } = useArticleImage(articleId, alt);

  if (isLoading) {
    return (
      <div className="w-full my-8">
        <Skeleton className="w-full h-64" />
      </div>
    );
  }

  if (!imageUrl) {
    console.log('No image URL found for:', { articleId, alt });
    return null;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className="w-full aspect-video object-cover rounded-lg my-8"
      onError={(e) => {
        console.error('Image failed to load:', imageUrl);
        toast({
          title: "Image failed to load",
          description: "There was a problem loading the image. Please try again later.",
          variant: "destructive",
        });
      }}
    />
  );
};