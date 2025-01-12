import { CreateArticleData } from "./createArticle";
import { defaultImages } from "@/utils/imageUtils";

/**
 * Example of how to create an article with multiple relevant Unsplash images
 * This serves as a template and documentation for creating new articles
 */
export const createArticleExample: CreateArticleData = {
  title: "Modern Interior Design Trends for Living Spaces",
  content: `<h1>Modern Interior Design Trends for Living Spaces</h1>
<p>Interior design is constantly evolving, with new trends emerging that combine functionality with aesthetic appeal.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.living}" alt="Modern living room with natural light" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Living Room Trends</h2>
<p>Modern living rooms are embracing open concepts and natural materials...</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.modern}" alt="Contemporary minimalist design" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Sustainable Materials</h2>
<p>Sustainability is at the forefront of modern design...</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="${defaultImages.minimalist}" alt="Minimalist interior with sustainable materials" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>`,
  metaTitle: "Modern Interior Design Trends 2024 | Living Space Ideas",
  metaDescription: "Discover the latest modern interior design trends for living spaces. Learn about sustainable materials, minimalist approaches, and how to create stunning contemporary interiors.",
  slug: "modern-interior-design-trends-2024",
  categories: ["Interior Design", "Modern", "Living Room"],
  locations: ["United Kingdom"],
  faqs: [
    {
      question: "What are the key modern interior design trends for 2024?",
      answer: "The key trends include sustainable materials, minimalist designs, and multifunctional spaces that combine aesthetics with practicality."
    },
    {
      question: "How can I incorporate sustainable materials in my interior design?",
      answer: "You can incorporate sustainable materials by choosing recycled or renewable materials, using eco-friendly finishes, and selecting furniture from sustainable sources."
    }
  ]
};

/**
 * Best practices for article creation:
 * 1. Use descriptive alt text for images to help with image selection
 * 2. Include multiple relevant images throughout the content
 * 3. Ensure images are related to the section content
 * 4. Use high-quality Unsplash images with proper attribution
 * 5. Maintain consistent image sizing and styling
 */
export const articleCreationTips = {
  imageSelection: "Choose images that directly relate to the content section",
  altText: "Use descriptive alt text that includes relevant keywords",
  spacing: "Maintain consistent spacing between images and content",
  quality: "Use high-resolution images (recommended width: 800px)",
  variety: "Include different perspectives and styles while maintaining theme consistency"
};