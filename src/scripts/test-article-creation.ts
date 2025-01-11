import { createArticle } from "../lib/articles";

export async function testArticleCreation() {
  try {
    console.log("Starting test article creation...");
    
    const article = await createArticle(
      "Test Article with Image",
      "<h1>Test Article with Image</h1><p>This is a test article to verify database insertion with an image.</p><img alt='A beautiful test image showing interior design' />",
      "Test Article with Image - Meta Title",
      "This is a test meta description for an article with image",
      "test-article-with-image",
      ["Test Category", "Interior Design"],
      ["Test Location", "London"],
      [
        {
          question: "Test Question About Images?",
          answer: "Test Answer about images and design"
        },
        {
          question: "Another Test Question?",
          answer: "Another Test Answer"
        }
      ]
    );
    
    console.log("Article created successfully:", article);
    return article;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

// Run the test if this file is executed directly
if (import.meta.url === new URL(import.meta.resolve('./test-article-creation.ts')).href) {
  testArticleCreation();
}