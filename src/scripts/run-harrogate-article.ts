import { insertHarrogateArticle } from './insert-harrogate-article';

console.log('Starting to insert Harrogate article...');
insertHarrogateArticle()
  .then(() => {
    console.log('Successfully inserted Harrogate article');
  })
  .catch((error) => {
    console.error('Error inserting Harrogate article:', error);
  });