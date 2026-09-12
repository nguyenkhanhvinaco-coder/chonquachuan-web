import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import EbookLeadForm from "@/components/EbookLeadForm";
import EbookMoreList from "@/components/EbookMoreList";
import { EBOOKS, EBOOK_READER_URL, ebookProductRef } from "@/lib/ebook";

export const metadata: Metadata = {
  title: "Ebook: 10 bài học kinh doanh từ Chung Ju Yung",
  description:
    "Đọc miễn phí ebook 10 bài học kinh doanh từ Chung Ju Yung, người sáng lập Hyundai — thực hiện bởi Chọn Quà Chuẩn.",
  alternates: { canonical: "/ebook" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    { "@type": "ListItem", position: 2, name: "Ebook", item: "https://chonquachuan.vn/ebook" },
  ],
};

export default function EbookPage() {
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
            Tủ sách doanh nhân
          </span>
          <h1 className="font-serif text-[32px] md:text-[40px] leading-tight">
            10 bài học kinh doanh từ Chung Ju Yung
          </h1>
          <p className="text-ink-soft text-[15px] md:text-base leading-relaxed">
            Người sáng lập Hyundai — từ cậu bé nông dân bỏ nhà bốn lần với vài đồng bạc trong túi,
            đến người dựng nên một trong những tập đoàn công nghiệp lớn nhất châu Á. Lật từng trang
            ngay bên dưới, hoàn toàn miễn phí.
          </p>
        </div>
        <EbookLeadForm productRef={ebookProductRef(EBOOKS[0].id)} title={EBOOKS[0].title} />
      </section>

      <section className="px-3 sm:px-9 md:px-[72px] pb-16 flex items-start justify-center gap-5">
        <EbookMoreList currentId={EBOOKS[0].id} />
        {/* Kho trang sach ben trong la 780x760 (rong hon truoc, thap hon mot
            chut). Chieu cao khung vua du chua trang sach + thanh dieu huong,
            khong de thua qua nhieu khoang trong quanh sach. */}
        <div
          className="rounded-xl border border-line overflow-hidden bg-surface-2 w-full max-w-[880px]"
          style={{ height: "min(900px, 92vh)" }}
        >
          <iframe
            src={EBOOK_READER_URL}
            title="10 bài học kinh doanh từ Chung Ju Yung — đọc online"
            className="w-full h-full"
            style={{ border: "none" }}
            loading="lazy"
          />
        </div>
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
