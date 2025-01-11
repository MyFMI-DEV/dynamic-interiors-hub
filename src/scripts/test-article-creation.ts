import { createArticle } from "../lib/articles";

export async function testArticleCreation() {
  console.log("Starting test article creation...");
  
  const article = await createArticle(
    "Simple Test Article",
    "<h1>Simple Test Article</h1><p>This is a simple test article without any complex features.</p>",
    "Simple Test Article - Meta Title",
    "This is a test meta description for a simple article",
    "simple-test-article",
    ["Test Category"],
    ["Test Location"],
    [
      {
        question: "What is this article about?",
        answer: "This is a simple test article to demonstrate basic functionality."
      }
    ]
  );
  
  console.log("Article created successfully:", article);
  return article;
}

// Run the test if this file is executed directly
if (import.meta.url === new URL(import.meta.resolve('./test-article-creation.ts')).href) {
  testArticleCreation();
}