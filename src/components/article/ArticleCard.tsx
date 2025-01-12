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
    dining: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800",
    garden: "https://images.unsplash.com/photo-1558521558-037f1cb027c5?q=80&w=800",
    modern: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
    traditional: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800",
    minimalist: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800",
    default: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800"
  };

  // Select relevant image based on article title/content
  const getDefaultImage = (article: Article) => {
    const title = article.title.toLowerCase();
    const content = article.meta_description.toLowerCase();
    
    // Check both title and content for relevant keywords
    if (title.includes('living') || content.includes('living room')) return defaultImages.living;
    if (title.includes('kitchen') || content.includes('kitchen')) return defaultImages.kitchen;
    if (title.includes('bedroom') || content.includes('bedroom')) return defaultImages.bedroom;
    if (title.includes('bathroom') || content.includes('bathroom')) return defaultImages.bathroom;
    if (title.includes('office') || content.includes('office')) return defaultImages.office;
    if (title.includes('dining') || content.includes('dining')) return defaultImages.dining;
    if (title.includes('garden') || content.includes('garden')) return defaultImages.garden;
    if (title.includes('modern') || content.includes('modern')) return defaultImages.modern;
    if (title.includes('traditional') || content.includes('traditional')) return defaultImages.traditional;
    if (title.includes('minimalist') || content.includes('minimalist')) return defaultImages.minimalist;
    
    // If no specific match is found, return a random image from the collection
    const images = Object.values(defaultImages);
    const randomIndex = Math.floor(Math.random() * (images.length - 1)); // -1 to exclude default
    return images[randomIndex];
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