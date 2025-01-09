import { supabase } from "@/integrations/supabase/client";

export async function uploadArticleImages() {
  try {
    const { data, error } = await supabase.functions.invoke('upload-article-images');
    
    if (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
    
    console.log('Upload response:', data);
    return data;
  } catch (error) {
    console.error('Failed to upload images:', error);
    throw error;
  }
}