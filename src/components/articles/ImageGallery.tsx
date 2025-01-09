import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [processedImages, setProcessedImages] = useState(images);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  useEffect(() => {
    const generateMissingImages = async () => {
      if (!images.some(img => !img.url && img.alt)) return;
      
      setIsGeneratingImages(true);
      const updatedImages = await Promise.all(
        images.map(async (image) => {
          if (!image.url && image.alt) {
            try {
              const response = await fetch('/api/generate-article-image', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: image.alt,
                  description: `Interior design image related to ${image.alt}`,
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to generate image');
              }

              const data = await response.json();
              toast.success(`Generated image for ${image.alt}`);
              return { ...image, url: data.imageUrl };
            } catch (error) {
              console.error('Error generating image:', error);
              toast.error(`Failed to generate image for ${image.alt}`);
              return image;
            }
          }
          return image;
        })
      );

      setProcessedImages(updatedImages);
      setIsGeneratingImages(false);
    };

    generateMissingImages();
  }, [images]);

  if (processedImages.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {processedImages.map((image, index) => (
        <div key={index} className="relative">
          {!image.url && isGeneratingImages ? (
            <div className="aspect-video bg-accent animate-pulse rounded-lg flex items-center justify-center">
              <p className="text-primary text-sm">Generating image for: {image.alt}</p>
            </div>
          ) : image.url ? (
            <a href="https://www.findmyinteriors.co.uk" className="block group">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
};