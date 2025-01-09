export const getFullImageUrl = (path: string) => {
  if (!path) return '/placeholder.svg';
  
  // If it's already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If it starts with a slash, append it to the domain
  if (path.startsWith('/')) {
    return `https://www.findmyinteriors.co.uk${path}`;
  }

  // Otherwise, add both slash and domain
  return `https://www.findmyinteriors.co.uk/${path}`;
};
