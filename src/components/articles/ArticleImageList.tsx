import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import LoadingState from "@/components/ui/LoadingState";

const ArticleImageList = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('image_url, images');
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error loading articles</div>;
  if (!articles?.length) return <div>No articles found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Article Main Images:</h2>
      <ul className="list-disc pl-6 mb-6">
        {articles.map((article, index) => (
          <li key={`main-${index}`} className="mb-2">
            www.findmyinteriors.co.uk{article.image_url}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Article Additional Images:</h2>
      <ul className="list-disc pl-6">
        {articles.map((article, index) => {
          if (article.images && Array.isArray(article.images)) {
            return article.images.map((image: { url: string }, imgIndex: number) => (
              <li key={`additional-${index}-${imgIndex}`} className="mb-2">
                www.findmyinteriors.co.uk{image.url}
              </li>
            ));
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ArticleImageList;