import { useQuery } from "@tanstack/react-query";
import { getRelevantImage } from "@/utils/imageUtils";

export const useArticleImage = (articleId: string, altText: string) => {
  return useQuery({
    queryKey: ['article-image', articleId, altText],
    queryFn: async () => {
      console.log('Fetching image for:', { articleId, altText });
      
      // If we have an altText, use it to get a relevant image
      if (altText) {
        const relevantImage = getRelevantImage(altText);
        console.log('Using relevant image:', relevantImage);
        return relevantImage;
      }
      
      return null;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};