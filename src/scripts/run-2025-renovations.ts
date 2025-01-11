import { insert2025RenovationsArticle } from './insert-2025-renovations';

console.log('Starting article insertion...');

insert2025RenovationsArticle()
  .then((article) => {
    console.log('Successfully inserted 2025 renovations article:', article);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to insert 2025 renovations article:', error);
    process.exit(1);
  });