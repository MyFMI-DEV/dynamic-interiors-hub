import { createArticle } from "../lib/articles";

export async function insertRenovationArticle() {
  try {
    const article = await createArticle(
      "Renovating Your Home in 2025",
      `[Your provided HTML content]`, // The full HTML content you provided
      "Home Renovation Guide 2025: Latest Trends & Expert Tips",
      "Discover the latest home renovation trends for 2025, including sustainable materials, smart technology, and design innovations. Get expert tips and cost estimates.",
      "renovating-your-home-2025",
      ["Home Renovation", "Interior Design", "Smart Home", "Sustainable Living"],
      ["United Kingdom"],
      [
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
      ]
    );
    
    console.log("Article created successfully:", article);
  } catch (error) {
    console.error("Error creating article:", error);
  }
}
