import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import EbookLeadForm from "@/components/EbookLeadForm";
import { EBOOKS, ebookProductRef } from "@/lib/ebook";

// Cuốn thứ 2 của tủ sách. Giống trang /ebook: đọc miễn phí trên web, muốn
// nhận PDF thì để lại email/Zalo qua EbookLeadForm (miễn phí). Nội dung diễn
// giải từ sách của Thiền sư Thích Nhất Hạnh nên có ghi nguồn rõ ở đầu trang.
const BOOK = EBOOKS.find((b) => b.id === "khong-diet-khong-sinh")!;

export const metadata: Metadata = {
  title: "Ebook: Không diệt, không sinh — đừng sợ hãi",
  description:
    "Đọc miễn phí ebook đúc kết tuệ giác của Thiền sư Thích Nhất Hạnh về nỗi sợ, sự tiếp nối và hạnh phúc trong hiện tại — thực hiện bởi Chọn Quà Chuẩn.",
  alternates: { canonical: "/ebook/khong-diet-khong-sinh" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    { "@type": "ListItem", position: 2, name: "Ebook", item: "https://chonquachuan.vn/ebook" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Không diệt, không sinh — đừng sợ hãi",
      item: "https://chonquachuan.vn/ebook/khong-diet-khong-sinh",
    },
  ],
};

export default function EbookKhongDietKhongSinhPage() {
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
            Tủ sách an lạc
          </span>
          <h1 className="font-serif text-[32px] md:text-[40px] leading-tight">
            Không diệt, không sinh — đừng sợ hãi
          </h1>
          <p className="text-ink-soft text-[15px] md:text-base leading-relaxed">
            Bốn hình ảnh để hiểu nỗi sợ, hai bài thực tập để sống an hơn, và một lời nhắc rằng hạnh
            phúc có địa chỉ ngay đây, bây giờ. Lật từng trang ngay bên dưới, hoàn toàn miễn phí.
          </p>
          <p className="text-ink-soft text-[13px] leading-relaxed">
            Nội dung diễn giải từ sách <em>Không diệt không sinh đừng sợ hãi</em> của Thiền sư Thích
            Nhất Hạnh — không phải trích nguyên văn. Mời bạn
            tìm đọc sách gốc.
          </p>
        </div>
        <EbookLeadForm productRef={ebookProductRef(BOOK.id)} title={BOOK.title} />
      </section>

      <section className="px-3 sm:px-9 md:px-[72px] pb-16">
        <div className="rounded-xl border border-line overflow-hidden bg-surface-2" style={{ height: "min(900px, 92vh)" }}>
          <iframe
            src={BOOK.readerUrl}
            title="Không diệt, không sinh — đừng sợ hãi — đọc online"
            className="w-full h-full"
            style={{ border: "none" }}
            loading="lazy"
          />
        </div>
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
