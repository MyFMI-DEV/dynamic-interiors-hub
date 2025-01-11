import { createArticle } from "../lib/articles";

export async function testArticleCreation() {
  try {
    console.log("Starting test article creation...");
    
    const article = await createArticle(
      "Test Article 2",
      "<h1>Test Article 2</h1><p>This is a test article to verify database insertion.</p>",
      "Test Article 2 - Meta Title",
      "This is a test meta description for article 2",
      "test-article-2",
      ["Test Category"],
      ["Test Location"],
      [
        {
          question: "Test Question?",
          answer: "Test Answer"
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