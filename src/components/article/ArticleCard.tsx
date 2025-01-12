import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Article } from "@/lib/articleUtils";
import { useArticleImage } from "@/hooks/useArticleImage";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const { data: imageSrc } = useArticleImage(
    article.id,
    article.title + ' ' + article.meta_description
  );

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
      <Link to={`/articles/${article.slug}`} className="block">
        <AspectRatio ratio={16/9} className="bg-muted">
          <img 
            src={article.image_url || imageSrc} 
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