import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { LoadingState } from "@/components/ui/LoadingState";

const ArticlesList = () => {
  const { data: articles, isLoading, error } = useArticles();

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error loading articles</div>;
  if (!articles?.length) return <div>No articles found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <Link
              to={`/articles/${article.slug}`}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Read More →
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ArticlesList;