import { supabase } from "@/integrations/supabase/client";

export async function insertRenovationArticle() {
  try {
    // Insert the main article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: "Renovating Your Home in 2025",
        content: `[Your provided HTML content]`, // The full HTML content you provided
        meta_title: "Home Renovation Guide 2025: Latest Trends & Expert Tips",
        meta_description: "Discover the latest home renovation trends for 2025, including sustainable materials, smart technology, and design innovations. Get expert tips and cost estimates.",
        slug: "renovating-your-home-2025",
      })
      .select()
      .single();

    if (articleError) throw articleError;

    // Add categories
    const categories = ["Home Renovation", "Interior Design", "Smart Home", "Sustainable Living"];
    const categoryPromises = categories.map(category =>
      supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category,
        })
    );

    // Add locations (UK-wide article)
    const locations = ["United Kingdom"];
    const locationPromises = locations.map(location =>
      supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location,
        })
    );

    // Add FAQs
    const faqs = [
      {
        question: "What are the top home renovation trends for 2025?",
        answer: "Home renovation trends include bold colors, sustainable materials, smart home technology, multifunctional spaces, and energy-efficient upgrades."
      },
      {
        question: "How much should I budget for a complete home renovation in 2025?",
        answer: "Budgets can vary widely, but it's advisable to set aside a contingency fund of 10-20% of the total budget."
      },
      {
        question: "What are the most cost-effective energy-efficient upgrades for homes in 2025?",
        answer: "Upgrades like modern thermostats, heat pumps, and proper insulation can significantly reduce energy consumption."
      },
      {
        question: "How can I incorporate smart home technology into my renovation plans?",
        answer: "Consider integrating automated lighting, security systems, and voice-activated devices to enhance convenience."
      },
      {
        question: "What are the best sustainable materials for home renovations in 2025?",
        answer: "Natural materials that promote biophilic design are increasingly favored, aligning with eco-friendly renovation practices."
      }
    ];

    const faqPromises = faqs.map(faq =>
      supabase
        .from('article_faqs')
        .insert({
          article_id: article.id,
          question: faq.question,
          answer: faq.answer,
        })
    );

    // Wait for all insertions to complete
    await Promise.all([
      ...categoryPromises,
      ...locationPromises,
      ...faqPromises,
    ]);

    console.log('Article successfully created with ID:', article.id);
    return article;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
}