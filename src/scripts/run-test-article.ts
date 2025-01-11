import { testArticleCreation } from './test-article-creation';

console.log('Starting to test article creation...');
testArticleCreation()
  .then(() => {
    console.log('Successfully tested article creation');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error testing article creation:', error);
    process.exit(1);
  });