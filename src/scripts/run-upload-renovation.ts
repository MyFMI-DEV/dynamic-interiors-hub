import { main } from './upload-renovation-article';

console.log('Starting to upload Renovation article...');
main()
  .then(() => {
    console.log('Successfully uploaded Renovation article');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error uploading Renovation article:', error);
    process.exit(1);
  });