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

  if (articleError) throw articleError;

  // Insert categories
  const categoryPromises = categories.map(category =>
    supabase
      .from('article_categories')
      .insert({
        article_id: article.id,
        category,
      })
  );

  // Insert locations
  const locationPromises = locations.map(location =>
    supabase
      .from('article_locations')
      .insert({
        article_id: article.id,
        location,
      })
  );

  // Insert FAQs
  const faqPromises = faqs.map(faq =>
    supabase
      .from('article_faqs')
      .insert({
        article_id: article.id,
        question: faq.question,
        answer: faq.answer,
      })
  );

  // Wait for all insertions to complete
  await Promise.all([
    ...categoryPromises,
    ...locationPromises,
    ...faqPromises,
  ]);

  return article;
}