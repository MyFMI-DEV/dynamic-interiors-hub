import React from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16 bg-[#EDF6F9] p-8 rounded-xl shadow-sm">
      <h2 className="text-4xl font-semibold text-[#006D77] mb-8">Frequently Asked Questions</h2>
      <div className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#221F26] mb-4">{faq.question}</h3>
            <p className="text-[#8E9196] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;