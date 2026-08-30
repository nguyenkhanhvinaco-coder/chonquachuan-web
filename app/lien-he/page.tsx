import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import LeadFormTrigger from "@/components/LeadForm";
import { ZALO_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Về chúng tôi & Liên hệ",
  description:
    "Chọn Quà Chuẩn thuộc Công ty TNHH Nguyên Khánh Vina — thông tin pháp nhân, địa chỉ và cách liên hệ để được tư vấn quà tặng.",
  alternates: { canonical: "/lien-he" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    { "@type": "ListItem", position: 2, name: "Liên hệ", item: "https://chonquachuan.vn/lien-he" },
  ],
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <section className="px-9 pt-12 pb-8 md:px-[72px] flex flex-col gap-3 max-w-[720px]">
        <h1 className="font-serif text-[32px] md:text-[40px] leading-tight">Về chúng tôi</h1>
        <p className="text-ink-soft text-[15px] md:text-base leading-relaxed">
          Chọn Quà Chuẩn là nền tảng giúp doanh nghiệp và cá nhân tìm quà tặng phù hợp, nhanh và ý
          nghĩa — từ quà tri ân đối tác, quà cá nhân, set quà handmade cho tới quà tặng số. Chúng
          tôi kết nối bạn với các nhà cung cấp phù hợp thay vì bắt bạn phải tự tìm kiếm.
        </p>
      </section>

      <section className="px-9 pb-8 md:px-[72px] flex flex-col gap-2 max-w-[720px]">
        <h2 className="font-serif text-xl">Thông tin pháp nhân</h2>
        <dl className="flex flex-col gap-1.5 text-[15px]">
          <div className="flex gap-2">
            <dt className="text-ink-soft w-32 flex-shrink-0">Đơn vị vận hành</dt>
            <dd>Công ty TNHH Nguyên Khánh Vina</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-soft w-32 flex-shrink-0">Mã số thuế</dt>
            <dd>0319221275</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-soft w-32 flex-shrink-0">Trụ sở</dt>
            <dd>244/29 Huỳnh Văn Bánh, Phường Phú Nhuận, TP. Hồ Chí Minh</dd>
          </div>
        </dl>
      </section>

      <section className="px-9 pb-16 md:px-[72px] flex flex-col gap-4 max-w-[720px]">
        <h2 className="font-serif text-xl">Liên hệ</h2>
        <p className="text-ink-soft text-[15px]">
          Có câu hỏi hoặc muốn được tư vấn quà tặng? Gửi yêu cầu cho chúng tôi, đội ngũ Chọn Quà
          Chuẩn sẽ liên hệ lại sớm nhất.
        </p>
        <dl className="flex flex-col gap-2.5 text-[15px]">
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="text-ink-soft sm:w-32 flex-shrink-0">Email</dt>
            <dd>
              <a
                href="mailto:lienhe@chonquachuan.vn"
                className="text-accent font-semibold"
              >
                lienhe@chonquachuan.vn
              </a>
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="text-ink-soft sm:w-32 flex-shrink-0">Điện thoại / Zalo</dt>
            <dd>
              <a href="tel:+84827288286" className="text-accent font-semibold">
                082 728 8286
              </a>
            </dd>
          </div>
        </dl>

        <div className="flex items-center gap-3 flex-wrap">
          <LeadFormTrigger
            productId="lien-he-chung"
            productLabel="Liên hệ chung"
            triggerLabel="Gửi yêu cầu tư vấn"
            triggerClassName="bg-accent text-accent-ink rounded-lg px-6 py-3.5 text-[15px] font-semibold min-h-[44px]"
            source="lien-he"
          />
          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-[1.5px] border-line rounded-lg px-6 py-3.5 text-[15px] font-semibold min-h-[44px] flex items-center"
          >
            Nhắn tin Zalo
          </a>
        </div>
      </section>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/chinh-sach-du-lieu-ca-nhan" className="text-ink-soft text-[13px] font-medium">
            Chính sách dữ liệu cá nhân
          </Link>
          <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
        </div>
      </footer>
    </div>
  );
}
