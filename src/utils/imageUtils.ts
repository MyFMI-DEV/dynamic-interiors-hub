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

/**
 * Select relevant image based on content keywords
 */
export const getRelevantImage = (text: string): string => {
  const keywords = text.toLowerCase();
  
  if (keywords.includes('living')) return defaultImages.living;
  if (keywords.includes('kitchen')) return defaultImages.kitchen;
  if (keywords.includes('bedroom')) return defaultImages.bedroom;
  if (keywords.includes('bathroom')) return defaultImages.bathroom;
  if (keywords.includes('office')) return defaultImages.office;
  if (keywords.includes('dining')) return defaultImages.dining;
  if (keywords.includes('garden')) return defaultImages.garden;
  if (keywords.includes('modern')) return defaultImages.modern;
  if (keywords.includes('traditional')) return defaultImages.traditional;
  if (keywords.includes('minimalist')) return defaultImages.minimalist;
  
  // If no specific match is found, return a random image
  const images = Object.values(defaultImages);
  const randomIndex = Math.floor(Math.random() * (images.length - 1)); // -1 to exclude default
  return images[randomIndex];
};