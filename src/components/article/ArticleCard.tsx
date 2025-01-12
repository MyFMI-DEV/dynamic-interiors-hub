import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Article } from "@/lib/articleUtils";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // Collection of relevant interior design images from Unsplash
  const defaultImages = {
    living: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800",
    bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800",
    bathroom: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800",
    office: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800",
    default: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800"
  };

  // Select relevant image based on article title/content
  const getDefaultImage = (article: Article) => {
    const title = article.title.toLowerCase();
    if (title.includes('living')) return defaultImages.living;
    if (title.includes('kitchen')) return defaultImages.kitchen;
    if (title.includes('bedroom')) return defaultImages.bedroom;
    if (title.includes('bathroom')) return defaultImages.bathroom;
    if (title.includes('office')) return defaultImages.office;
    return defaultImages.default;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <Link to={`/articles/${article.slug}`} className="block">
        <AspectRatio ratio={16/9} className="bg-muted">
          <img 
            src={article.image_url || getDefaultImage(article)} 
            alt={article.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </AspectRatio>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3 text-primary hover:text-primary/80 transition-colors">
            {article.title}
          </h2>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {article.meta_description}
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {new Date(article.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};