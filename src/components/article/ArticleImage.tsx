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

  // Handle both relative and absolute URLs
  const processImageUrl = (url: string) => {
    if (!url) return '';
    // If it's already a relative URL starting with /lovable-uploads, use it as is
    if (url.startsWith('/lovable-uploads')) {
      return url;
    }
    // If it's an absolute URL, extract the path after lovable-uploads
    if (url.includes('lovable-uploads')) {
      const match = url.match(/\/lovable-uploads\/.*$/);
      return match ? match[0] : url;
    }
    return url;
  };

  console.log('Rendering image:', { alt, imageUrl });
  return imageUrl ? (
    <img
      src={processImageUrl(imageUrl)}
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
  ) : null;
};