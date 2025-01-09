import { uploadArticleImages } from "./uploadArticleImages";

export async function initializeArticleImages() {
  try {
    console.log('Starting article images upload...');
    const result = await uploadArticleImages();
    console.log('Upload completed:', result);
    return result;
  } catch (error) {
    console.error('Failed to initialize article images:', error);
    throw error;
  }
}

// Execute the upload
initializeArticleImages();