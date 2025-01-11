import { createArticle } from "../lib/articles";
import { harrogateArticleContent } from "../data/articles/harrogate-content";
import { harrogateArticleMetadata } from "../data/articles/harrogate-metadata";
import { harrogateFAQs } from "../data/articles/harrogate-faqs";

export const insertHarrogateArticle = async () => {
  try {
    const article = await createArticle(
      harrogateArticleMetadata.title,
      harrogateArticleContent,
      harrogateArticleMetadata.metaTitle,
      harrogateArticleMetadata.metaDescription,
      harrogateArticleMetadata.slug,
      harrogateArticleMetadata.categories,
      harrogateArticleMetadata.locations,
      harrogateFAQs
    );
    
    console.log("Article created successfully:", article);
  } catch (error) {
    console.error("Error creating article:", error);
  }
};