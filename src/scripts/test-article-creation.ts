import { createArticle } from "../lib/articles";

export async function testArticleCreation() {
  console.log("Starting test article creation...");
  
  try {
    const article = await createArticle(
      "Test Article",
      "<h1>Test Article</h1><p>This is a simple test article to demonstrate the simplified article system.</p>",
      "Test Article - Meta Title",
      "A simple test article to demonstrate the basic functionality of our article system",
      "test-article",
      ["Interior Design"],
      ["London"],
      [
        {
          question: "What is this article about?",
          answer: "This is a test article demonstrating our simplified article system."
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