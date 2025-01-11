import { createArticle } from "../lib/articles";

export async function testArticleCreation() {
  console.log("Starting test article creation...");
  
  const article = await createArticle(
    "Test Article with Image 2",
    "<h1>Test Article with Image 2</h1><p>This is another test article to verify database insertion with an image.</p><img alt='A beautiful interior design showcase with modern furniture' />",
    "Test Article with Image 2 - Meta Title",
    "This is a test meta description for another article with image",
    "test-article-with-image-2",
    ["Test Category", "Interior Design"],
    ["Test Location", "London"],
    [
      {
        question: "Test Question About Interior Design?",
        answer: "This is a detailed answer about interior design principles"
      },
      {
        question: "What makes a good interior design?",
        answer: "A good interior design balances functionality with aesthetics"
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