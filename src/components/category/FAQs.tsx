import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQsProps {
  category: string;
  location: string;
}

const FAQs = ({ category, location }: FAQsProps) => {
  const faqs = [
    {
      question: `How does Find My Interiors connect buyers and sellers for ${category} in ${location}?`,
      answer: `Our platform provides a seamless connection between buyers and sellers of ${category} in ${location} through our user-friendly interface, allowing direct communication and easy browsing of local listings.`
    },
    {
      question: `Can I search specifically for ${category} in ${location}?`,
      answer: `Yes! Our advanced search features allow you to find exactly what you're looking for in ${category} within ${location}, with filters to refine your search based on your specific needs.`
    },
    {
      question: `How do I post my ${category} products or services in ${location} on the platform?`,
      answer: `Simply create an account, click on 'Post Free' button, select ${category} as your category and ${location} as your location, then follow the step-by-step process to list your products or services.`
    },
    {
      question: `Is there a fee to browse or post ${category} in ${location}?`,
      answer: `Browsing ${category} listings in ${location} is completely free. We also offer free basic listings to help sellers connect with potential buyers in the local area.`
    },
    {
      question: `How can I ensure secure transactions for ${category} purchases in ${location}?`,
      answer: `We recommend using secure payment methods, meeting in safe public locations for in-person transactions, and thoroughly reviewing seller profiles and ratings before making ${category} purchases in ${location}.`
    },
    {
      question: `Are there ways to find trending ${category} options in ${location}?`,
      answer: `Yes! Our platform highlights popular and trending ${category} listings in ${location}, helping you stay updated with the latest options and best deals in your area.`
    },
    {
      question: `What types of ${category} services are available in ${location}?`,
      answer: `You'll find a wide range of ${category} services in ${location}, from professional installations to custom designs, repairs, and consultations, all provided by local experts.`
    },
    {
      question: `How do I edit my ${category} post details in ${location}?`,
      answer: `Log into your account, navigate to your listings, select your ${category} post in ${location}, and click the 'Edit' button to update any information about your products or services.`
    },
    {
      question: `What are the best practices for maximizing visibility of ${category} posts in ${location}?`,
      answer: `To maximize visibility for your ${category} listings in ${location}, use high-quality images, write detailed descriptions, keep your pricing competitive, and regularly update your listings with current information.`
    },
    {
      question: `How can I report a suspicious ${category} post in ${location}?`,
      answer: `If you encounter a suspicious ${category} listing in ${location}, use the 'Report' button on the listing page or contact our support team. We take all reports seriously to maintain a safe marketplace.`
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