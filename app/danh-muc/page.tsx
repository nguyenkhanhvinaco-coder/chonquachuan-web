import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import CatalogGrid from "@/components/CatalogGrid";
import { CATEGORY_ICONS } from "@/components/icons";
import { categories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Danh mục quà tặng",
  description:
    "Duyệt danh mục quà tặng doanh nghiệp, quà tri ân đối tác, quà cá nhân, set handmade và quà tặng số tại Chọn Quà Chuẩn.",
  alternates: { canonical: "/danh-muc" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    { "@type": "ListItem", position: 2, name: "Danh mục", item: "https://chonquachuan.vn/danh-muc" },
  ],
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <section className="px-9 pt-12 pb-2 md:px-[72px] flex flex-col gap-2">
        <h1 className="font-serif text-[32px]">Danh mục quà tặng</h1>
        <p className="text-ink-soft text-[15px]">
          Mua ngay quà có sẵn — quà số nhận link tức thì, quà vật lý giao trong vài ngày. Cần số
          lượng lớn hoặc in logo riêng?{" "}
          <Link href="/tim-qua" className="font-semibold">
            Yêu cầu báo giá →
          </Link>
        </p>
      </section>

      <section className="px-9 pt-7 pb-2 md:px-[72px] grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((c) => {
          const Icon = CATEGORY_ICONS[c.icon];
          return (
            <div
              key={c.label}
              className="flex flex-col items-center gap-2.5 bg-surface border border-line rounded-2xl px-3 py-5 text-center"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
                <Icon size={22} color={c.fg} />
              </div>
              <span className="text-[13px] font-semibold">{c.label}</span>
            </div>
          );
        })}
      </section>

      <CatalogGrid products={products} />

      <section className="mx-9 mb-20 md:mx-[72px] bg-ink rounded-[20px] p-8 md:p-11 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-bg text-xl">Cần số lượng lớn hoặc in logo riêng?</h3>
          <p className="text-sm" style={{ color: "oklch(0.75 0.02 60)" }}>
            Dùng công cụ tìm quà để nhận gợi ý phù hợp và yêu cầu báo giá theo đúng ngân sách, số
            lượng.
          </p>
        </div>
        <Link
          href="/tim-qua"
          className="flex-shrink-0 bg-bg text-ink rounded-[10px] px-[26px] py-3.5 text-[15px] font-semibold"
        >
          Tìm quà theo nhu cầu →
        </Link>
      </section>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
      </footer>
    </div>
  );
}
