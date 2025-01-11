import { insert2025RenovationsArticle } from './insert-2025-renovations';

insert2025RenovationsArticle()
  .then(() => {
    console.log('Successfully inserted 2025 renovations article');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to insert 2025 renovations article:', error);
    process.exit(1);
  });