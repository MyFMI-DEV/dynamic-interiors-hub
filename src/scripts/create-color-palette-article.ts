import { supabase } from "../integrations/supabase/client";

const articleData = {
  title: "Best Color Palettes for Modern Interiors",
  content: `<h1>Best Color Palettes for Modern Interiors</h1>
    
<p>Creating the perfect color palette for your modern interior is essential for achieving a cohesive and stylish look. Here are some of the best color combinations that work particularly well in contemporary spaces:</p>

<h2>1. Neutral Base with Bold Accents</h2>
<p>Start with a foundation of warm whites and soft greys, then add pops of color through deep navy blue, emerald green, or burnt orange.</p>

<h2>2. Monochromatic Sophistication</h2>
<p>Layer different shades of the same color family using soft cream, warm beige, rich taupe, and deep brown.</p>

<h2>3. Modern Minimalist</h2>
<p>Keep it simple with pure white, charcoal grey, and matte black.</p>`,
  meta_title: "Best Color Palettes for Modern Interior Design Guide",
  meta_description: "Discover the perfect color combinations for modern interiors. Learn how to create sophisticated and stylish spaces with our expert color palette guide.",
  slug: "best-color-palettes-modern-interiors"
};

async function createColorPaletteArticle() {
  try {
    console.log('Starting to create color palette article...');
    
    const { data: article, error } = await supabase
      .from('articles')
      .insert(articleData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('Article created successfully:', article);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create article:', error);
    process.exit(1);
  }
}

createColorPaletteArticle();