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
    }: CreateArticleParams) => {
      // First check if article exists
      const { data: existingArticle } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single();

      let article;
      
      if (existingArticle) {
        // Update existing article
        const { data: updatedArticle, error: updateError } = await supabase
          .from('articles')
          .update({
            title,
            description,
            content,
            image_url: imageUrl,
            meta_title: metaTitle,
            meta_description: metaDescription,
            keywords,
          })
          .eq('id', existingArticle.id)
          .select()
          .single();

        if (updateError) throw updateError;
        article = updatedArticle;

        // Delete existing relationships to update them
        await supabase.from('article_locations').delete().eq('article_id', article.id);
        await supabase.from('article_categories').delete().eq('article_id', article.id);
        await supabase.from('article_faqs').delete().eq('article_id', article.id);
      } else {
        // Insert new article
        const { data: newArticle, error: articleError } = await supabase
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
        article = newArticle;
      }

      // Insert or update location
      const { error: locationError } = await supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        });

      if (locationError) throw locationError;

      // Insert or update category
      const { error: categoryError } = await supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        });

      if (categoryError) throw categoryError;

      // Insert or update FAQs
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
        description: "Article updated successfully",
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