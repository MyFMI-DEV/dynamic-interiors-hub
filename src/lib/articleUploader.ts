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
    // Check if article with same slug exists
    const { data: existingArticle } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', articleData.slug)
      .maybeSingle();

    if (existingArticle) {
      console.error('Article with this slug already exists');
      throw new Error('Article with this slug already exists');
    }

    // Step 1: Insert main article as a new row
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

    // Step 2: Insert categories as new rows
    const categoryPromises = articleData.categories.map(category => {
      console.log(`Inserting category ${category} for article ${article.id}`);
      return supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        });
    });

    // Step 3: Insert locations as new rows
    const locationPromises = articleData.locations.map(location => {
      console.log(`Inserting location ${location} for article ${article.id}`);
      return supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        });
    });

    // Step 4: Insert FAQs as new rows
    const faqPromises = articleData.faqs.map(faq => {
      console.log(`Inserting FAQ ${faq.question} for article ${article.id}`);
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
        console.error(`Error in related data insertion at index ${index}:`, result.error);
        throw result.error;
      }
    });

    console.log('Article upload completed successfully');
    return article;
  } catch (error) {
    console.error('Error in article upload process:', error);
    throw error;
  }
}