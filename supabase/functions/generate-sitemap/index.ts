import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all locations (including sub-locations) and categories
    const { data: locations } = await supabase
      .from('locations')
      .select('main_location, sub_location');

    const { data: categories } = await supabase
      .from('categories')
      .select('sub_category');

    if (!locations || !categories) {
      throw new Error('Failed to fetch locations or categories');
    }

    // Generate URLs for all location/category combinations
    const urls = locations.flatMap(location => 
      categories.map(category => ({
        loc: `https://your-domain.com/${location.main_location.toLowerCase()}-${location.sub_location.toLowerCase().replace(/\s+/g, '-')}/${category.sub_category.toLowerCase().replace(/\s+/g, '-')}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      }))
    );

    // Add static pages
    const staticPages = [
      {
        loc: 'https://your-domain.com',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        loc: 'https://your-domain.com/locations',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      }
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticPages, ...urls].map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});