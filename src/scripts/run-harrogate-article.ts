import { insertHarrogateArticle } from './insert-harrogate-article';

console.log('Starting to insert Harrogate article...');
insertHarrogateArticle()
  .then(() => {
    console.log('Successfully inserted Harrogate article');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error inserting Harrogate article:', error);
    process.exit(1);
  });