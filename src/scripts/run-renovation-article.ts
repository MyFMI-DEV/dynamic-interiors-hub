import { insertRenovationArticle } from "./insert-renovation-article";

insertRenovationArticle()
  .then(() => {
    console.log('Successfully completed article insertion');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to insert article:', error);
    process.exit(1);
  });