import { cn } from "@/lib/utils";

interface FAQSectionProps {
  faqs: Array<{ question: string; answer: string }>;
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  if (faqs.length === 0) return null;

  return (
    <div className="bg-accent rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">FAQ Section</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn("pb-4", index !== faqs.length - 1 && "border-b border-gray-200")}
          >
            <h3 className="font-medium text-primary mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};