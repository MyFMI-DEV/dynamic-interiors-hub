import { insertRenovationArticle } from './insert-renovation-article';

console.log('Starting to create renovation article...');

insertRenovationArticle()
  .then((article) => {
    console.log('Successfully created renovation article:', article);
    console.log('Article ID:', article.id);
    console.log('Article slug:', article.slug);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error creating renovation article:', error);
    process.exit(1);
  });