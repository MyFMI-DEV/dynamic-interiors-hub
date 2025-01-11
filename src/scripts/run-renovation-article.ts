import { insertRenovationArticle } from "./insert-renovation-article";

insertRenovationArticle()
  .then(() => {
    console.log('Article insertion completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error inserting article:', error);
    process.exit(1);
  });