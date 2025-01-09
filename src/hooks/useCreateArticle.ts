import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface CreateArticleParams {
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  location: string;
  category: string;
  faqs: Array<{ question: string; answer: string }>;
  images: Array<{ url?: string; alt: string }>;
}

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async ({
      title,
      slug,
      description,
      content,
      imageUrl,
      metaTitle,
      metaDescription,
      keywords,
      location,
      category,
      faqs,
      images,
    }: CreateArticleParams) => {
      // Insert the main article
      const { data: article, error: articleError } = await supabase
        .from('articles')
        .insert({
          title,
          slug,
          description,
          content,
          image_url: imageUrl,
          meta_title: metaTitle,
          meta_description: metaDescription,
          keywords,
        })
        .select()
        .single();

      if (articleError) throw articleError;

      // Insert location
      const { error: locationError } = await supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        });

      if (locationError) throw locationError;

      // Insert category
      const { error: categoryError } = await supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        });

      if (categoryError) throw categoryError;

      // Insert FAQs
      const { error: faqsError } = await supabase
        .from('article_faqs')
        .insert(
          faqs.map(faq => ({
            article_id: article.id,
            question: faq.question,
            answer: faq.answer,
          }))
        );

      if (faqsError) throw faqsError;

      return article;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Article created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};