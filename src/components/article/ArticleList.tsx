import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "./ArticleCard";
import { fetchAllArticles } from "@/lib/articleUtils";

export const ArticleList = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchAllArticles
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles?.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};