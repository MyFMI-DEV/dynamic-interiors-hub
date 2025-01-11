import { supabase } from "@/integrations/supabase/client";

export interface ArticleInput {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  categories: string[];
  locations: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export async function uploadArticle(articleData: ArticleInput) {
  console.log('Starting article upload process:', { title: articleData.title });

  try {
    // Step 1: Insert main article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: articleData.title,
        content: articleData.content,
        meta_title: articleData.metaTitle,
        meta_description: articleData.metaDescription,
        slug: articleData.slug,
      })
      .select()
      .single();

    if (articleError) {
      console.error('Error inserting article:', articleError);
      throw new Error(`Failed to insert article: ${articleError.message}`);
    }

    if (!article) {
      throw new Error('Article was not created - no data returned');
    }

    console.log('Article inserted successfully:', article);

    // Step 2: Insert categories
    for (const category of articleData.categories) {
      const { error: categoryError } = await supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        });

      if (categoryError) {
        console.error(`Error inserting category ${category}:`, categoryError);
        throw new Error(`Failed to insert category: ${categoryError.message}`);
      }
      console.log(`Category ${category} inserted successfully`);
    }

    // Step 3: Insert locations
    for (const location of articleData.locations) {
      const { error: locationError } = await supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        });

      if (locationError) {
        console.error(`Error inserting location ${location}:`, locationError);
        throw new Error(`Failed to insert location: ${locationError.message}`);
      }
      console.log(`Location ${location} inserted successfully`);
    }

    // Step 4: Insert FAQs
    for (const faq of articleData.faqs) {
      const { error: faqError } = await supabase
        .from('article_faqs')
        .insert({
          article_id: article.id,
          question: faq.question,
          answer: faq.answer,
        });

      if (faqError) {
        console.error(`Error inserting FAQ ${faq.question}:`, faqError);
        throw new Error(`Failed to insert FAQ: ${faqError.message}`);
      }
      console.log(`FAQ ${faq.question} inserted successfully`);
    }

    console.log('Article upload completed successfully');
    return article;
  } catch (error) {
    console.error('Error in article upload process:', error);
    throw error;
  }
}