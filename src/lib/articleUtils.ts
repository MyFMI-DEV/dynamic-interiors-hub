import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  slug: string;
  created_at: string;
  image_url?: string;
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const { data: articleData, error: articleError } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (articleError) throw articleError;

  const { data: faqs, error: faqsError } = await supabase
    .from('article_faqs')
    .select('*')
    .eq('article_id', articleData.id);

  if (faqsError) throw faqsError;

  return { ...articleData, faqs };
}

export async function fetchAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
  
  return data;
}