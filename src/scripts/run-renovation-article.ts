import { insertRenovationArticle } from './insert-renovation-article';

console.log('Starting to insert Renovation article...');
insertRenovationArticle()
  .then(() => {
    console.log('Successfully inserted Renovation article');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error inserting Renovation article:', error);
    process.exit(1);
  });