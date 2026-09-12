import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EbookReaderPage from "@/components/EbookReaderPage";
import { EBOOKS } from "@/lib/ebook";

// Trang riêng /ebook/<id> cho mọi cuốn TRỪ cuốn nổi bật (cuốn đó ở /ebook).
// Dựng sẵn lúc build; đường dẫn lạ trả về 404.
const OTHERS = EBOOKS.slice(1);

export const dynamicParams = false;

export function generateStaticParams() {
  return OTHERS.map((b) => ({ slug: b.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = OTHERS.find((b) => b.id === params.slug);
  if (!book) return {};
  return {
    title: `Ebook: ${book.title}`,
    description: book.description,
    alternates: { canonical: book.href },
  };
}

export default function EbookSlugPage({ params }: { params: { slug: string } }) {
  const book = OTHERS.find((b) => b.id === params.slug);
  if (!book) notFound();
  return <EbookReaderPage book={book} />;
}
