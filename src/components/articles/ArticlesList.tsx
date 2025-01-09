import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ArticlesList = () => {
  // This is a placeholder for the articles that will be added
  const articles = [
    {
      id: 1,
      title: "Welcome to Our Interior Design Articles",
      description: "Discover expert insights, tips, and guides for transforming your home with professional interior design advice.",
      image: "/lovable-uploads/13058f80-e0ed-415e-9dac-d36d661617c5.png",
      slug: "welcome-to-interior-design-articles"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src={article.image}
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