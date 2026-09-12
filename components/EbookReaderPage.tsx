import Link from "next/link";
import Header from "@/components/Header";
import EbookLeadForm from "@/components/EbookLeadForm";
import EbookMoreList from "@/components/EbookMoreList";
import { ebookProductRef, type Ebook } from "@/lib/ebook";

// Khuôn chung cho mọi trang đọc ebook /ebook/<tên sách> (app/ebook/[slug]).
// Mọi chữ riêng của từng cuốn nằm trong lib/ebook.ts — không sửa ở đây khi
// thêm cuốn mới.
const SITE_URL = "https://chonquachuan.vn";

export default function EbookReaderPage({ book }: { book: Ebook }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Ebook", item: `${SITE_URL}/ebook` },
      { "@type": "ListItem", position: 3, name: book.title, item: `${SITE_URL}${book.href}` },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <section className="px-9 pt-12 pb-8 md:px-[72px] flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-[560px]">
          <span className="text-ink-soft text-[13px] font-semibold tracking-wide uppercase">
            {book.series}
          </span>
          <h1 className="font-serif text-[32px] md:text-[40px] leading-tight [text-wrap:balance]">
            {book.title}
          </h1>
          <p className="text-ink-soft text-[15px] md:text-base leading-relaxed">{book.intro}</p>
          {book.sourceNote && (
            <p className="text-ink-soft text-[13px] leading-relaxed">{book.sourceNote}</p>
          )}
        </div>
        <EbookLeadForm productRef={ebookProductRef(book.id)} title={book.title} />
      </section>

      <section className="px-3 sm:px-9 md:px-[72px] pb-16 flex items-start justify-center gap-5">
        <EbookMoreList currentId={book.id} variant="side" />
        <div className="w-full max-w-[880px] flex flex-col gap-3">
          <EbookMoreList currentId={book.id} variant="drop" />
          {/* Kho trang sach ben trong la 780x760. Chieu cao khung vua du chua
              trang sach + thanh dieu huong. */}
          <div
            className="rounded-xl border border-line overflow-hidden bg-surface-2 w-full"
            style={{ height: "min(900px, 92vh)" }}
          >
            <iframe
              src={book.readerUrl}
              title={`${book.title} — đọc online`}
              className="w-full h-full"
              style={{ border: "none" }}
              loading="lazy"
            />
          </div>
        </div>
        {/* Cân giữa khung đọc khi màn hình đủ rộng cho cả cột trống bên phải. */}
        <div className="hidden 2xl:block w-[200px] shrink-0" aria-hidden="true" />
      </section>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/danh-muc" className="text-ink-soft text-[13px] font-medium">
            Danh mục
          </Link>
          <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
            Liên hệ
          </Link>
          <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
        </div>
      </footer>
    </div>
  );
}
