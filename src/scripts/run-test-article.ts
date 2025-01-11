import { testArticleCreation } from './test-article-creation';

console.log('Starting to test article creation...');

testArticleCreation()
  .then((article) => {
    console.log('Successfully created article:', article);
    console.log('Article ID:', article.id);
    console.log('Article slug:', article.slug);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error creating test article:', error);
    process.exit(1);
  });