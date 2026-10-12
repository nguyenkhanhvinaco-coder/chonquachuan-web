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
    // 12/10/2026: MỌI cuốn đều có openGraph riêng (trước đây cuốn chưa có ogImage rơi về
    // tiêu đề + ảnh chung của site -> link chia sẻ Facebook hiện sai nội dung, bị coi là
    // xem trước không khớp). Chưa có ảnh ngang thì dùng ảnh bìa.
    openGraph: {
      type: "article",
      locale: "vi_VN",
      siteName: "Chọn Quà Chuẩn",
      url: book.href,
      title: book.title,
      description: book.description,
      images: book.ogImage ? [{ url: book.ogImage, width: 2400, height: 1260 }] : [{ url: book.cover }],
    },
  };
}

export default function EbookSlugPage({ params }: { params: { slug: string } }) {
  const book = bySlug(params.slug);
  if (!book) notFound();
  return <EbookReaderPage book={book} />;
}
