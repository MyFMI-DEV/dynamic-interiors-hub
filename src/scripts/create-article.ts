import { createArticle, CreateArticleData } from "../lib/createArticle";

// Example article data - replace with your actual article data
const articleData: CreateArticleData = {
  title: "Your Article Title",
  content: `<h1>Your Article Title</h1>
<p>Your article content goes here...</p>`,
  metaTitle: "SEO Title for the Article",
  metaDescription: "SEO description for the article",
  slug: "your-article-slug",
  imageUrl: "https://example.com/your-image.jpg",
  categories: ["Category 1", "Category 2"],
  locations: ["Location 1", "Location 2"],
  faqs: [
    {
      question: "Example FAQ Question 1?",
      answer: "Answer to FAQ question 1."
    },
    {
      question: "Example FAQ Question 2?",
      answer: "Answer to FAQ question 2."
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