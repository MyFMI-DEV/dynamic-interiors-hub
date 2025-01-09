import { supabase } from "@/integrations/supabase/client";

export const insertHarrogateArticle = async () => {
  try {
    // Insert the main article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: "Harrogate Home Design: A Perfect Blend of Style",
        slug: "harrogate-home-design-perfect-blend-style",
        description: "Discover the unique charm of Harrogate home design, where historical architecture meets contemporary style. Learn about local trends, sustainable practices, and luxury elements that make Harrogate homes special.",
        content: `[Your provided HTML content]`, // Full HTML content here
        image_url: "https://www.findmyinteriors.co.uk/lovable-uploads/d60fa430-dfe1-4db5-84c4-ac740134aa18.png",
        meta_title: "Harrogate Home Design Guide: Interior Design Trends & Tips",
        meta_description: "Explore Harrogate's unique home design trends, from traditional charm to modern luxury. Get expert insights on local architecture, sustainable design, and renovation tips.",
        keywords: ["Harrogate home design", "interior design Harrogate", "luxury homes Harrogate", "sustainable design", "home renovation Harrogate", "architectural styles", "spa town heritage", "local architects", "planning permission", "home trends 2025"],
      })
      .select()
      .single();

    if (articleError) throw articleError;

    // Insert location
    const { error: locationError } = await supabase
      .from('article_locations')
      .insert({
        article_id: article.id,
        location: "harrogate",
      });

    if (locationError) throw locationError;

    // Insert category
    const { error: categoryError } = await supabase
      .from('article_categories')
      .insert({
        article_id: article.id,
        category: "home-design",
      });

    if (categoryError) throw categoryError;

    // Insert FAQs
    const faqs = [
      {
        question: "What are the key characteristics of Harrogate home design?",
        answer: "Harrogate home design is characterized by a blend of historical and contemporary styles, a focus on sustainability, and an influence from the local cultural scene."
      },
      {
        question: "How do I incorporate sustainable design elements in my Harrogate home?",
        answer: "To incorporate sustainable elements, consider using eco-friendly materials, energy-efficient appliances, and designs that maximize natural light and ventilation."
      },
      {
        question: "What should I consider when seeking planning permission for a home renovation in Harrogate?",
        answer: "It's crucial to understand local regulations, engage with local authorities early, and ensure that your project complies with planning guidelines."
      },
      {
        question: "How does Harrogate's climate influence local home design trends?",
        answer: "Harrogate's climate, with its moderate temperatures and rainfall, encourages designs that prioritize insulation, natural light, and energy efficiency."
      },
      {
        question: "Where can I find reputable interior designers and architects in Harrogate?",
        answer: "A great starting point is to explore local directories and websites, such as Find My Interiors and Houzz."
      }
    ];

    const { error: faqsError } = await supabase
      .from('article_faqs')
      .insert(
        faqs.map(faq => ({
          article_id: article.id,
          question: faq.question,
          answer: faq.answer,
        }))
      );

    if (faqsError) throw faqsError;

    console.log('Article successfully inserted:', article);
    return article;

  } catch (error) {
    console.error('Error inserting article:', error);
    throw error;
  }
};

// Execute the insertion
insertHarrogateArticle();