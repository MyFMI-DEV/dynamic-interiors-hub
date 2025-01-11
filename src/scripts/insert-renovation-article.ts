import { supabase } from "@/integrations/supabase/client";

export async function insertRenovationArticle() {
  try {
    console.log('Starting to insert renovation article...');

    // Insert the main article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: 'Renovating Your Home in 2025',
        content: `<h1>Renovating Your Home in 2025</h1>
<p>The pandemic has shifted how we view home renovations. Since early 2020, the demand for renovations has surged by 50%, as homeowners seek spaces that are functional, stylish, and sustainable (Rated People, 2023). As we step into 2025, various trends are emerging to shape the renovation landscape.</p>

<h2>What You Need to Know</h2>
<table>
<tr>
<th>Trend</th>
<th>Key Considerations</th>
</tr>
<tr>
<td>Bold Colors and Patterns</td>
<td>Shift towards vibrant hues; moving away from neutrals.</td>
</tr>
<tr>
<td>Sustainable Materials</td>
<td>Natural materials are preferred; eco-friendly choices are essential.</td>
</tr>
<tr>
<td>Smart Home Integration</td>
<td>Technology must be discreetly integrated into designs.</td>
</tr>
<tr>
<td>Multifunctional Spaces</td>
<td>Rooms need to serve more than one purpose for flexibility.</td>
</tr>
<tr>
<td>Energy-Efficient Upgrades</td>
<td>Focus on reducing energy consumption and costs.</td>
</tr>
</table>

<h2>Embracing Bold Colors and Patterns</h2>
<p>In 2025, homeowners are leaving behind cool, neutral palettes and opting for bold colors and patterns that energize their spaces. A recent study shows that clients are increasingly requesting vibrant shades for their walls, ceilings, and trims (The Spruce, 2024). This trend reflects a desire for personal expression, allowing each room to tell a unique story through color.</p>

<h2>Sustainable Materials and Eco-Friendly Solutions</h2>
<p>More homeowners are choosing sustainable materials for renovations. Building an eco-friendly home in the UK can cost between £225,000 to £585,000, depending on size and design complexity. This trend aligns with biophilic design principles, emphasizing harmony with nature by opting for natural materials over engineered ones.</p>

<h2>Smart Home Integration</h2>
<p>As we progress towards 2025, integrating smart home technology is becoming essential in renovations. Homeowners increasingly seek ways to incorporate automated systems for lighting, security, and climate control without compromising aesthetics. This trend highlights the importance of discreet technology integration for a modern living experience.</p>

<h2>Multifunctional Spaces</h2>
<p>The rise of hybrid work models has changed how homeowners perceive their spaces. There is a growing demand for multifunctional areas that serve multiple purposes. For example, dining rooms are being transformed into home offices, providing flexibility in space usage.</p>

<h2>Energy-Efficient Upgrades</h2>
<p>Energy efficiency is a significant factor in home renovations. Upgrading to energy-efficient solutions like modern thermostats and heat pumps can reduce heating costs and energy consumption substantially. These upgrades not only benefit the environment but also save homeowners money in the long run.</p>

<h2>Kitchen Renovations</h2>
<p>Kitchen renovations consistently rank high on homeowners' wish lists. With estimated costs ranging from £16,000 to £48,000, this area is often viewed as a valuable investment. In fact, 66% of homeowners prioritized kitchen upgrades in the past two years, underscoring the significance of this space in daily life.</p>

<h2>Bathroom Transformations</h2>
<p>Bathroom renovations can vary widely, ranging from £2,000 to over £12,000, depending on layout changes and materials. The popularity of spa-like wet rooms has surged, with a 19% increase in real estate listings featuring these luxurious spaces. Homeowners now seek to create personal retreats within their homes.</p>

<h2>Outdoor Living Spaces</h2>
<p>As interest in outdoor renovations grows, homeowners seek to create inviting outdoor living areas. The demand for outdoor kitchens and landscaped gardens has surged, raising a home's value by up to 77% (Sliding Door Wardrobe Company, 2022). Homeowners aim to blend indoor and outdoor living seamlessly.</p>

<h2>Lighting and Fixture Trends</h2>
<p>Lighting is crucial in setting the mood and functionality of a space. Homeowners are increasingly choosing matching ceiling light fixtures in open-plan areas for visual continuity. The trend of accent lighting is also rising, with cordless rechargeable lights becoming favorites for easy installation and layered effects.</p>

<h2>Flooring Innovations</h2>
<p>Flooring choices significantly impact a home's overall look and feel. General upgrades, such as painting and flooring, typically range from £4,000 to £12,000, depending on the material quality. There is a noticeable shift away from all-white designs towards more colorful and patterned flooring options, aligning with the trend of bold interiors.</p>

<h2>Home Office Design</h2>
<p>The rise of remote work has led to increased demand for well-designed home offices. Homeowners seek layouts that allow for productivity while remaining part of the home environment. Discreetly integrated technology in home office spaces has become a priority, keeping work areas neat and organized.</p>

<h2>Budgeting and Financial Planning</h2>
<p>Effective budgeting is crucial for successful home renovations. Homeowners should set aside a contingency fund of 10-20% of the total budget to cover unexpected expenses. With rising costs in the renovation sector, planning ahead can prevent financial strain.</p>`,
        meta_title: 'Renovating Your Home in 2025: Latest Trends and Essential Tips',
        meta_description: 'Discover the latest home renovation trends for 2025, from bold colors to smart technology integration. Learn about sustainable materials, energy efficiency, and budgeting tips.',
        slug: 'renovating-your-home-2025',
        image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
      })
      .select()
      .single();

    if (articleError) {
      throw articleError;
    }

    console.log('Article inserted successfully:', article);

    // Insert categories
    const categories = ['Interior Design', 'Home Improvement', 'Renovation', 'Smart Home'];
    const categoryPromises = categories.map(category =>
      supabase
        .from('article_categories')
        .insert({
          article_id: article.id,
          category
        })
    );

    await Promise.all(categoryPromises);
    console.log('Categories inserted successfully');

    // Insert locations
    const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Edinburgh'];
    const locationPromises = locations.map(location =>
      supabase
        .from('article_locations')
        .insert({
          article_id: article.id,
          location
        })
    );

    await Promise.all(locationPromises);
    console.log('Locations inserted successfully');

    // Insert FAQs
    const faqs = [
      {
        question: 'What are the top home renovation trends for 2025?',
        answer: 'Home renovation trends include bold colors, sustainable materials, smart home technology, multifunctional spaces, and energy-efficient upgrades.'
      },
      {
        question: 'How much should I budget for a complete home renovation in 2025?',
        answer: 'Budgets can vary widely, but it\'s advisable to set aside a contingency fund of 10-20% of the total budget.'
      },
      {
        question: 'What are the most cost-effective energy-efficient upgrades for homes in 2025?',
        answer: 'Upgrades like modern thermostats, heat pumps, and proper insulation can significantly reduce energy consumption.'
      },
      {
        question: 'How can I incorporate smart home technology into my renovation plans?',
        answer: 'Consider integrating automated lighting, security systems, and voice-activated devices to enhance convenience.'
      },
      {
        question: 'What are the best sustainable materials for home renovations in 2025?',
        answer: 'Natural materials that promote biophilic design are increasingly favored, aligning with eco-friendly renovation practices.'
      }
    ];

    const faqPromises = faqs.map(faq =>
      supabase
        .from('article_faqs')
        .insert({
          article_id: article.id,
          question: faq.question,
          answer: faq.answer
        })
    );

    await Promise.all(faqPromises);
    console.log('FAQs inserted successfully');

    console.log('Article and related data inserted successfully!');
    return article;
  } catch (error) {
    console.error('Error inserting article:', error);
    throw error;
  }
}