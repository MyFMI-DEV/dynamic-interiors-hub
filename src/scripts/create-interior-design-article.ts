import { createArticle, CreateArticleData } from "../lib/createArticle";
import { defaultImages } from "@/utils/imageUtils";

const articleData: CreateArticleData = {
  title: "Essential Interior Design Principles for Modern Homes",
  content: `<h1>Essential Interior Design Principles for Modern Homes</h1>
<p>Understanding the fundamental principles of interior design is crucial for creating harmonious and functional living spaces.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.modern}" alt="Modern interior design example" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Balance and Harmony</h2>
<p>Balance is the equal distribution of visual weight in a room. Whether symmetrical or asymmetrical, achieving proper balance creates a sense of stability and comfort.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.living}" alt="Balanced living room design" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Scale and Proportion</h2>
<p>Scale refers to how pieces relate to the room size, while proportion is about how items relate to each other. Both are essential for creating cohesive spaces.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.minimalist}" alt="Well-proportioned minimalist space" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>`,
  metaTitle: "Essential Interior Design Principles | Modern Home Guide 2024",
  metaDescription: "Learn the fundamental principles of interior design for modern homes. Discover how to create balanced, harmonious spaces through proper scale, proportion, and design elements.",
  slug: "essential-interior-design-principles-2024",
  categories: ["Interior Design", "Modern", "Design Principles"],
  locations: ["United Kingdom"],
  faqs: [
    {
      question: "What are the most important principles of interior design?",
      answer: "The most important principles include balance, harmony, scale, proportion, rhythm, and emphasis. These elements work together to create cohesive and aesthetically pleasing spaces."
    },
    {
      question: "How do you achieve balance in interior design?",
      answer: "Balance can be achieved through symmetrical arrangement (mirror images), asymmetrical arrangement (different but equally weighted elements), or radial arrangement (elements around a central point)."
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