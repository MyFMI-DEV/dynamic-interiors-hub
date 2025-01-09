import { cn } from "@/lib/utils";
import ArticleContent from "./ArticleContent";

interface ArticleTemplateProps {
  title: string;
  content: string;
  keyPoints: string[];
  tableData: Array<{ key: string; value: string }>;
  images: Array<{ url: string; alt: string }>;
  faqs: Array<{ question: string; answer: string }>;
  trends?: Array<{ label: string; value: number }>;
}

export const ArticleTemplate = ({
  title,
  content,
  keyPoints,
  tableData,
  images,
  faqs,
  trends,
}: ArticleTemplateProps) => {
  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">{title}</h1>

      <div className="bg-accent rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">What You Need to Know</h2>
        <ul className="space-y-2 text-gray-700">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {tableData.length > 0 && (
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">Key Points</th>
                <th className="px-6 py-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-accent transition-colors">
                  <td className="px-6 py-4 font-medium">{row.key}</td>
                  <td className="px-6 py-4">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mb-8">
        <ArticleContent content={content} />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {images.map((image, index) => (
            <a key={index} href="https://www.findmyinteriors.co.uk" className="block group">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      )}

      {faqs.length > 0 && (
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
      )}

      {trends && trends.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-6">Interior Design Trends for 2025</h2>
          <div className="grid grid-cols-4 gap-4">
            {trends.map((trend, index) => (
              <div key={index} className="text-center">
                <div className="relative h-32 bg-accent rounded">
                  <div
                    className="absolute bottom-0 w-full bg-primary rounded-t"
                    style={{ height: `${trend.value}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm">
                      {trend.value}%
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{trend.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};