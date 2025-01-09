import { KeyPoints } from "./KeyPoints";
import { DataTable } from "./DataTable";
import { ImageGallery } from "./ImageGallery";
import { FAQSection } from "./FAQSection";
import { TrendsChart } from "./TrendsChart";

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
      <KeyPoints points={keyPoints} />
      <DataTable data={tableData} />
      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: content }} />
      <ImageGallery images={images} />
      <FAQSection faqs={faqs} />
      <TrendsChart trends={trends} />
    </article>
  );
};