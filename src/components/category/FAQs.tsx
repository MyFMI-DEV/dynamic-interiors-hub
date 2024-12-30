import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQsProps {
  category: string;
  location: string;
}

const FAQs = ({ category, location }: FAQsProps) => {
  const faqs = [
    {
      question: `How do I find the best deals on ${category} in ${location}?`,
      answer: `To find the best deals on ${category} in ${location}, simply browse our listings, filter by location, and compare prices from leading local sellers.`
    },
    {
      question: `Can I post my ${category} services or products for sale in ${location}?`,
      answer: `Yes! Our platform allows you to list your ${category} services or products in ${location} to connect with local buyers.`
    },
    {
      question: `Is it free to browse ${category} listings in ${location}?`,
      answer: `Absolutely! Browsing ${category} listings in ${location} is completely free. Start exploring now!`
    },
    {
      question: `How do I contact sellers of ${category} in ${location}?`,
      answer: `You can contact sellers directly through the platform by messaging them from their listing page in ${location}.`
    },
    {
      question: `Are the prices for ${category} in ${location} negotiable?`,
      answer: `Many sellers in ${location} are open to negotiation. Contact them to discuss the price for ${category} products or services.`
    },
    {
      question: `Can I filter ${category} listings in ${location} by price or type?`,
      answer: `Yes! Use our filters to sort ${category} listings in ${location} by price, type, or other preferences.`
    },
    {
      question: `How do I know if ${category} sellers in ${location} are trustworthy?`,
      answer: `Check reviews, ratings, and seller profiles for insights. We also encourage open communication before making a purchase in ${location}.`
    },
    {
      question: `Can I find professional services for ${category} in ${location}?`,
      answer: `Definitely! Our platform connects you with verified professionals offering ${category} services in ${location}.`
    },
    {
      question: `How do I get updates on new ${category} listings in ${location}?`,
      answer: `Sign up for alerts to receive notifications whenever new ${category} listings are added in ${location}.`
    },
    {
      question: `What payment methods are accepted for ${category} transactions in ${location}?`,
      answer: `Payment methods depend on the seller. Discuss your options directly with the seller in ${location} to ensure a smooth transaction.`
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQs;