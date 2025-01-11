import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";

const ArticleDetail = () => {
  const { slug } = useParams();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
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
    },
    enabled: !!slug
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.meta_title}
        description={article.meta_description}
        keywords={["interior design", "home improvement", "UK interiors"]}
        location="UK"
        category="Articles"
      />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <article className="prose prose-lg mx-auto">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-12">
              <h2>Frequently Asked Questions</h2>
              <div className="space-y-6">
                {article.faqs.map((faq: any) => (
                  <div key={faq.id} className="bg-accent rounded-lg p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;