import { insertDesignMethodsArticle } from './insert-design-methods';

console.log('Starting article insertion...');

insertDesignMethodsArticle()
  .then((article) => {
    console.log('Successfully inserted design methods article:', article);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to insert design methods article:', error);
    process.exit(1);
  });