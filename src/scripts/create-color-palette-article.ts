import { createArticle } from "../lib/createArticle";

const articleData = {
  title: "Best Color Palettes for Modern Interiors",
  content: `
    <h1>Best Color Palettes for Modern Interiors</h1>
    
    <p>Creating the perfect color palette for your modern interior is essential for achieving a cohesive and stylish look. Here are some of the best color combinations that work particularly well in contemporary spaces:</p>
    
    <h2>1. Neutral Base with Bold Accents</h2>
    <p>Start with a foundation of warm whites and soft greys, then add pops of color through:
    - Deep navy blue
    - Emerald green
    - Burnt orange</p>
    
    <h2>2. Monochromatic Sophistication</h2>
    <p>Layer different shades of the same color family:
    - Soft cream
    - Warm beige
    - Rich taupe
    - Deep brown</p>
    
    <h2>3. Modern Minimalist</h2>
    <p>Keep it simple with:
    - Pure white
    - Charcoal grey
    - Matte black</p>
    
    <p>Remember to consider the natural light in your space when selecting your palette, as this can significantly impact how colors appear throughout the day.</p>`,
  metaTitle: "Best Color Palettes for Modern Interior Design | Interior Design Guide",
  metaDescription: "Discover the perfect color combinations for modern interiors. Learn how to create sophisticated and stylish spaces with our expert color palette guide.",
  slug: "best-color-palettes-modern-interiors",
  categories: ["Interior Design", "Color Theory"],
  locations: ["United Kingdom"],
  faqs: [
    {
      question: "What are the best neutral colors for modern interiors?",
      answer: "The best neutral colors for modern interiors include warm whites, soft greys, beige, and taupe. These provide a versatile foundation that can be easily accented with bolder colors."
    },
    {
      question: "How many colors should I use in a modern interior?",
      answer: "For modern interiors, it's recommended to follow the 60-30-10 rule: 60% dominant color (usually a neutral), 30% secondary color, and 10% accent color. This creates a balanced and visually appealing space."
    }
  ]
};

async function createColorPaletteArticle() {
  try {
    console.log('Starting to create color palette article...');
    const article = await createArticle(articleData);
    console.log('Article created successfully:', article);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create article:', error);
    process.exit(1);
  }
}

createColorPaletteArticle();