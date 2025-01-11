import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

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
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse">Loading article...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
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
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <article className="prose prose-lg mx-auto max-w-4xl">
          <div 
            className="prose-headings:text-primary prose-h1:text-4xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-primary-light prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-md prose-strong:text-primary prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-li:text-muted-foreground prose-table:border-collapse prose-th:bg-accent prose-th:text-primary prose-th:p-2 prose-td:border prose-td:border-muted prose-td:p-2"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
          
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-primary-light mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {article.faqs.map((faq: any) => (
                  <div key={faq.id} className="bg-accent rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
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