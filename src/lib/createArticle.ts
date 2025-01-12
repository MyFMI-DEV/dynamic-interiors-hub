import { supabase } from "@/integrations/supabase/client";

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface CreateArticleData {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  imageUrl?: string;
  categories: string[];
  locations: string[];
  faqs: ArticleFAQ[];
}

export async function createArticle(data: CreateArticleData) {
  console.log('Starting article creation:', data.title);
  
  try {
    // 1. Insert the main article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: data.title,
        content: data.content,
        meta_title: data.metaTitle,
        meta_description: data.metaDescription,
        slug: data.slug,
        image_url: data.imageUrl
      })
      .select()
      .single();

    if (articleError) {
      console.error('Error creating article:', articleError);
      throw articleError;
    }

    console.log('Article created successfully:', article.id);

    // 2. Insert categories
    if (data.categories.length > 0) {
      const { error: categoriesError } = await supabase
        .from('article_categories')
        .insert(
          data.categories.map(category => ({
            article_id: article.id,
            category
          }))
        );

      if (categoriesError) {
        console.error('Error creating categories:', categoriesError);
        throw categoriesError;
      }
    }

    // 3. Insert locations
    if (data.locations.length > 0) {
      const { error: locationsError } = await supabase
        .from('article_locations')
        .insert(
          data.locations.map(location => ({
            article_id: article.id,
            location
          }))
        );

      if (locationsError) {
        console.error('Error creating locations:', locationsError);
        throw locationsError;
      }
    }

    // 4. Insert FAQs
    if (data.faqs.length > 0) {
      const { error: faqsError } = await supabase
        .from('article_faqs')
        .insert(
          data.faqs.map(faq => ({
            article_id: article.id,
            question: faq.question,
            answer: faq.answer
          }))
        );

      if (faqsError) {
        console.error('Error creating FAQs:', faqsError);
        throw faqsError;
      }
    }

    console.log('Article and all related data created successfully');
    return article;
  } catch (error) {
    console.error('Error in createArticle:', error);
    throw error;
  }
}