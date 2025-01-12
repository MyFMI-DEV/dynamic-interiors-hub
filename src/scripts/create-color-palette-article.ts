import { createArticle, CreateArticleData } from "../lib/createArticle";
import { defaultImages } from "@/utils/imageUtils";

const articleData: CreateArticleData = {
  title: "Best Color Palettes for Modern Interiors",
  content: `<h1>Best Color Palettes for Modern Interiors</h1>

<div class="minimalist-key-points">
    <h2>What You Need to Know</h2>
    <ul>
        <li>2025 color trends emphasize warm, rich shades that evoke comfort and sophistication.</li>
        <li>Colors like chocolate brown and dark green are set to dominate interior design.</li>
        <li>Vibrant yellows and burgundy will add a touch of positivity and luxury.</li>
        <li>Neutrals are shifting towards warmer tones such as mustard and caramel, enhancing versatility.</li>
    </ul>
</div>

<p>As we approach 2025, color trends in interior design are blossoming like a spring garden. Rich, warm shades like burgundy and dark green will take center stage, complemented by grounding earth tones.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.modern}" alt="Modern interior with warm earth tones" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>The Rise of Warm Earth Tones</h2>
<p>Warm earth tones are creating waves in modern interior design, with chocolate brown leading the charge. This rich color brings a sense of comfort, making it an ideal choice for living spaces.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.living}" alt="Living room with earth tones" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Sophisticated Greens: From Seafoam to Verdant</h2>
<p>Greens, especially dark verdant shades, are emerging as sophisticated choices for modern interiors. These colors add depth and warmth to spaces, making them ideal for walls, ceilings, and even floors.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.minimalist}" alt="Minimalist space with green accents" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>`,
  metaTitle: "Best Color Palettes for Modern Interiors 2025 | Interior Design Guide",
  metaDescription: "Discover the top color trends for 2025 interior design. Learn how to incorporate warm earth tones, sophisticated greens, and vibrant accents in your modern home.",
  slug: "best-color-palettes-modern-interiors-2025",
  categories: ["Interior Design", "Color Schemes", "Modern Design"],
  locations: ["United Kingdom"],
  faqs: [
    {
      question: "What are the most popular color palettes for modern interiors in 2025?",
      answer: "The key trends include warm earth tones, sophisticated greens, vibrant yellows, and deep reds like burgundy."
    },
    {
      question: "How can I incorporate bold colors into my interior design without overwhelming the space?",
      answer: "Use bold colors as accents or in smaller areas, such as pillows or art, while maintaining a neutral base."
    },
    {
      question: "What are some timeless color combinations for a modern home?",
      answer: "Combinations like navy with white, grey with mustard, and earthy tones with greens create lasting appeal."
    }
  ]
};

// Function to run the article creation
async function runArticleCreation() {
  try {
    console.log('Starting article creation process...');
    const article = await createArticle(articleData);
    console.log('Article created successfully:', article);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create article:', error);
    process.exit(1);
  }
}

// Run the creation process
runArticleCreation();