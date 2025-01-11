import { supabase } from "@/integrations/supabase/client";

export const insertHarrogateArticle = async () => {
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .insert({
      title: 'Harrogate: A Guide to the Best Attractions',
      content: '<p>Harrogate is a beautiful spa town in North Yorkshire, known for its stunning gardens and historic architecture.</p>',
      meta_title: 'Harrogate Attractions',
      meta_description: 'Discover the best attractions in Harrogate, from the famous Turkish Baths to the beautiful Valley Gardens.',
      slug: 'harrogate-attractions',
    })
    .select()
    .single();

  if (articleError) {
    console.error('Error inserting article:', articleError);
    throw articleError;
  }

  console.log('Inserted article:', article);
};
