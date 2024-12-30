import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string[];
  location: string;
  category: string;
}

export const SEOHead = ({ title, description, keywords, location, category }: SEOHeadProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "keywords": keywords.join(", "),
    "about": {
      "@type": "LocalBusiness",
      "name": `${category} in ${location}`,
      "areaServed": {
        "@type": "City",
        "name": location
      },
      "serviceType": category
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};