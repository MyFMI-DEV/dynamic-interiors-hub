import { supabase } from "@/integrations/supabase/client";

export async function createArticle(
  title: string,
  content: string,
  metaTitle: string,
  metaDescription: string,
  slug: string,
  categories: string[],
  locations: string[],
  faqs: Array<{ question: string; answer: string }>
) {
  console.log('Starting article creation:', { title, slug });
  
  // Insert the main article
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .insert({
      title,
      content,
      meta_title: metaTitle,
      meta_description: metaDescription,
      slug,
    })
    .select()
    .single();

  if (articleError) {
    console.error('Error inserting article:', articleError);
    throw articleError;
  }

  console.log('Article inserted successfully:', article);

  try {
    // Insert categories
    const categoryPromises = categories.map(category => {
      console.log('Inserting category:', category);
      return supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        });
    });

    // Insert locations
    const locationPromises = locations.map(location => {
      console.log('Inserting location:', location);
      return supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        });
    });

    // Insert FAQs
    const faqPromises = faqs.map(faq => {
      console.log('Inserting FAQ:', faq.question);
      return supabase
        .from('article_faqs')
        .insert({
          article_id: article.id,
          question: faq.question,
          answer: faq.answer,
        });
    });

    // Wait for all insertions to complete
    const results = await Promise.all([
      ...categoryPromises,
      ...locationPromises,
      ...faqPromises,
    ]);

    // Check for any errors in the results
    results.forEach((result, index) => {
      if (result.error) {
        console.error('Error in related data insertion:', result.error);
        throw result.error;
      }
    });

    console.log('All related data inserted successfully');
    return article;
  } catch (error) {
    console.error('Error inserting related data:', error);
    throw error;
  }
}