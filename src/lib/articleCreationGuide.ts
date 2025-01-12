import { CreateArticleData } from "./createArticle";

/**
 * Example of how to create an article with multiple relevant Unsplash images
 * This serves as a template and documentation for creating new articles
 */
export const createArticleExample: CreateArticleData = {
  title: "Modern Interior Design Trends for Living Spaces",
  content: `<h1>Modern Interior Design Trends for Living Spaces</h1>
<p>Interior design is constantly evolving, with new trends emerging that combine functionality with aesthetic appeal.</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" alt="Modern living room with natural light" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Living Room Trends</h2>
<p>Modern living rooms are embracing open concepts and natural materials...</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800" alt="Contemporary minimalist design" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
</div>

<h2>Sustainable Materials</h2>
<p>Sustainability is at the forefront of modern design...</p>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
<img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800" alt="Minimalist interior with sustainable materials" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">
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
 * Guide for selecting appropriate Unsplash images for articles
 */
export const imageSelectionGuide = {
  livingRoom: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
  modern: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
  minimalist: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800",
  kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
  bathroom: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800",
  office: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800",
  dining: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800",
  garden: "https://images.unsplash.com/photo-1558521558-037f1cb027c5?q=80&w=800",
  traditional: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800"
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