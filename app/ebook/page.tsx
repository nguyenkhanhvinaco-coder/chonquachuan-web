import type { Metadata } from "next";
import EbookReaderPage from "@/components/EbookReaderPage";
import { EBOOKS } from "@/lib/ebook";

// Trang /ebook luôn là cuốn NỔI BẬT (EBOOKS[0]). Các cuốn khác ở /ebook/<id>.
const BOOK = EBOOKS[0];

export const metadata: Metadata = {
  title: `Ebook: ${BOOK.title}`,
  description: BOOK.description,
  alternates: { canonical: "/ebook" },
};

export default function EbookPage() {
  return <EbookReaderPage book={BOOK} />;
}
