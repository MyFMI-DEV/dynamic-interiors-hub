import { createArticle } from "../lib/articles";

async function testArticleCreation() {
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
  } catch (error) {
    console.error("Error creating article:", error);
  }
}

testArticleCreation();