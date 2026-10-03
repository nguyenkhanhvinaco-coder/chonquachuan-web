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
    // Cuốn nào có ảnh chia sẻ riêng thì Facebook/Zalo hiện ảnh đó; openGraph
    // của trang thay hẳn openGraph chung nên phải ghi lại đủ các trường.
    ...(book.ogImage && {
      openGraph: {
        type: "article",
        locale: "vi_VN",
        siteName: "Chọn Quà Chuẩn",
        url: book.href,
        title: book.title,
        description: book.description,
        images: [{ url: book.ogImage, width: 2400, height: 1260 }],
      },
    }),
  };
}

export default function EbookSlugPage({ params }: { params: { slug: string } }) {
  const book = bySlug(params.slug);
  if (!book) notFound();
  return <EbookReaderPage book={book} />;
}
