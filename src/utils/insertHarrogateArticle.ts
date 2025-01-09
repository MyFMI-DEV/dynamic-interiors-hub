import { supabase } from "@/integrations/supabase/client";

export async function insertHarrogateArticle() {
  const { data: existingArticle } = await supabase
    .from('articles')
    .select()
    .eq('slug', 'harrogate-home-design-perfect-blend-style')
    .single();

  if (existingArticle) {
    // Article already exists, update the images
    const { error: updateError } = await supabase
      .from('articles')
      .update({
        content: `
        <h1>Harrogate Home Design</h1>
        <p>Discover the beauty of home design in Harrogate.</p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
          <a href="https://www.findmyinteriors.co.uk" style="flex: 1; min-width: 300px; max-width: 500px;">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Interior Design Services" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
          </a>
          <a href="https://www.findmyinteriors.co.uk" style="flex: 1; min-width: 300px; max-width: 500px;">
            <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" alt="Local Expertise" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
          </a>
        </div>
        <p>Explore various styles and categories of home design.</p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
          <a href="https://www.findmyinteriors.co.uk" style="flex: 1; min-width: 300px; max-width: 500px;">
            <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="Architectural Styles" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
          </a>
          <a href="https://www.findmyinteriors.co.uk" style="flex: 1; min-width: 300px; max-width: 500px;">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Home Categories" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
          </a>
        </div>
        <p>Find inspiration for your next home project.</p>
        `
      })
      .eq('slug', 'harrogate-home-design-perfect-blend-style');

    if (updateError) {
      console.error('Error updating article:', updateError);
    } else {
      console.log('Article images updated successfully');
    }
  }
}