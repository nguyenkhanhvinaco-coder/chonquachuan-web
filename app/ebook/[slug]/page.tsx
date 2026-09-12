import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EbookReaderPage from "@/components/EbookReaderPage";
import { EBOOKS, ebookSlug } from "@/lib/ebook";

// Trang đọc của MỌI cuốn: /ebook/<tên sách không dấu> (lấy từ href trong
// lib/ebook.ts). Dựng sẵn lúc build; đường dẫn lạ trả về 404.
const bySlug = (slug: string) => EBOOKS.find((b) => ebookSlug(b) === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return EBOOKS.map((b) => ({ slug: ebookSlug(b) }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = bySlug(params.slug);
  if (!book) return {};
  return {
    title: `Ebook: ${book.title}`,
    description: book.description,
    alternates: { canonical: book.href },
  };
}

export default function EbookSlugPage({ params }: { params: { slug: string } }) {
  const book = bySlug(params.slug);
  if (!book) notFound();
  return <EbookReaderPage book={book} />;
}
