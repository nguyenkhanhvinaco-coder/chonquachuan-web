import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import LeadFormTrigger from "@/components/LeadForm";
import { GiftIcon } from "@/components/icons";
import { getProducts } from "@/lib/products";

// Trang chi tiet san pham (kieu Etsy: anh lon, mo ta day du, gia, nut tu
// van) - cac the san pham o trang chu / danh muc mo trang nay o tab moi khi
// bam vao. Cung dung Supabase + revalidate 60s nhu cac trang khac.
export const revalidate = 60;

async function findProduct(id: string) {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await findProduct(params.id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/san-pham/${product.id}` },
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await findProduct(params.id);
  if (!product) notFound();

  return (
    <div className="flex flex-col">
      <Header />

      <section className="px-9 pt-6 pb-2 md:px-[72px]">
        <Link href="/danh-muc" className="text-ink-soft text-[13px] font-medium">
          ← Quay lại danh mục
        </Link>
      </section>

      <section className="px-9 pt-6 pb-20 md:px-[72px] grid md:grid-cols-2 gap-10 md:gap-16">
        <div
          className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[480px] flex items-center justify-center"
          style={{ background: product.color }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <GiftIcon size={64} color="white" strokeWidth={1.3} />
          )}
          {product.is_digital && (
            <span className="absolute top-4 left-4 bg-ink text-bg text-[12px] font-bold px-3 py-1.5 rounded-full z-10">
              Tải về ngay
            </span>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <span
            className="inline-flex self-start bg-accent-soft px-3 py-1.5 rounded-full text-[12.5px] font-semibold"
            style={{ color: "oklch(0.45 0.14 40)" }}
          >
            {product.category === "vat-ly"
              ? "Set quà vật lý"
              : product.category === "qua-so"
              ? "Quà tặng số"
              : "Combo doanh nghiệp"}
          </span>
          <h1 className="font-serif text-[26px] md:text-[34px] leading-tight">{product.name}</h1>
          <span className="text-2xl font-bold">{product.price_display}</span>
          <p className="text-ink-soft text-[15px] leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-3 mt-2">
            <LeadFormTrigger
              productId={product.id}
              productLabel={`${product.name} · ${product.price_display}`}
              triggerLabel={product.is_digital ? "Đặt mua" : "Nhận tư vấn ngay"}
              source="trang-chi-tiet-san-pham"
              triggerClassName="bg-accent text-accent-ink rounded-[10px] px-7 py-4 text-[15px] font-semibold min-h-[48px]"
            />
          </div>

          <p className="text-ink-soft text-xs mt-1">
            Yêu cầu của bạn sẽ được chuyển đến đội tư vấn Chọn Quà Chuẩn để báo giá và hỗ trợ đặt
            hàng trong ngày.
          </p>
        </div>
      </section>
    </div>
  );
}
