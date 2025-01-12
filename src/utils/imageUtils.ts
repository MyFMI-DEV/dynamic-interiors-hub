/**
 * Collection of relevant interior design images from Unsplash
 */
export const defaultImages = {
  living: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
  kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
  bathroom: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800",
  office: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800",
  dining: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800",
  garden: "https://images.unsplash.com/photo-1558521558-037f1cb027c5?q=80&w=800",
  modern: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
  traditional: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800",
  minimalist: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800",
  default: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800"
};

// Keep track of used images to ensure uniqueness
const usedImages = new Set<string>();

// Keywords mapping for better relevance matching
const keywordMap: Record<string, string[]> = {
  living: ['living room', 'lounge', 'sitting room', 'family room', 'salon'],
  kitchen: ['kitchen', 'cooking', 'culinary', 'dining'],
  bedroom: ['bedroom', 'sleeping', 'bed', 'master'],
  bathroom: ['bathroom', 'bath', 'shower', 'washroom', 'toilet'],
  office: ['office', 'study', 'work', 'desk', 'workspace'],
  dining: ['dining', 'eating', 'dinner', 'breakfast'],
  garden: ['garden', 'outdoor', 'patio', 'landscape'],
  modern: ['modern', 'contemporary', 'minimal'],
  traditional: ['traditional', 'classic', 'vintage', 'rustic'],
  minimalist: ['minimalist', 'minimal', 'simple', 'clean']
};

/**
 * Find the most relevant category based on text content
 */
const findBestMatch = (text: string): string => {
  const normalizedText = text.toLowerCase();
  let bestMatch = 'default';
  let maxMatches = 0;

  Object.entries(keywordMap).forEach(([category, keywords]) => {
    const matches = keywords.filter(keyword => normalizedText.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  });

  return bestMatch;
};

/**
 * Get available images for a category that haven't been used
 */
const getAvailableImages = (category: string): string[] => {
  const allImages = Object.entries(defaultImages)
    .filter(([key, url]) => key !== 'default' && !usedImages.has(url))
    .map(([_, url]) => url);

  if (allImages.length === 0) {
    // If all images have been used, reset the tracking
    usedImages.clear();
    return Object.values(defaultImages).filter(url => url !== defaultImages.default);
  }

  return allImages;
};

/**
 * Select relevant image based on content keywords
 */
export const getRelevantImage = (text: string): string => {
  console.log('Getting relevant image for:', text);
  
  if (!text) {
    console.log('No text provided, using default image');
    return defaultImages.default;
  }

  const category = findBestMatch(text);
  console.log('Best matching category:', category);

  const availableImages = getAvailableImages(category);
  
  // If we have a direct category match and it's available, use it
  const categoryImage = defaultImages[category as keyof typeof defaultImages];
  if (categoryImage && !usedImages.has(categoryImage)) {
    usedImages.add(categoryImage);
    console.log('Using category-specific image:', categoryImage);
    return categoryImage;
  }

  // Otherwise, select a random available image
  if (availableImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];
    usedImages.add(selectedImage);
    console.log('Using random available image:', selectedImage);
    return selectedImage;
  }

  console.log('No suitable images found, using default');
  return defaultImages.default;
};
