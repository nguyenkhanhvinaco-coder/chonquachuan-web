import Link from "next/link";
import Header from "@/components/Header";
import LeadFormTrigger from "@/components/LeadForm";
import { GiftIcon } from "@/components/icons";
import { getProducts } from "@/lib/products";

const STEP_ORDER = ["doi-tuong", "dip-tang", "ngan-sach", "so-luong", "phong-cach"] as const;

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const products = await getProducts();

  const tags = STEP_ORDER.map((key) => searchParams[key]).filter(
    (v): v is string => typeof v === "string" && v.length > 0
  );

  return (
    <div className="flex flex-col">
      <Header />

      <div className="px-9 py-6 md:px-[72px] border-b border-line flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="text-ink-soft text-sm">Gợi ý quà cho:</span>
          {tags.length === 0 ? (
            <span className="text-ink-soft text-sm italic">Chưa có tiêu chí — điền wizard để có gợi ý sát hơn.</span>
          ) : (
            tags.map((t, i) => (
              <span
                key={t + i}
                className="px-3 py-1.5 rounded-full text-[13px] font-semibold"
                style={{
                  background: i === 0 ? "var(--accent-soft)" : "var(--surface-2)",
                  color: i === 0 ? "oklch(0.45 0.14 40)" : "var(--ink)",
                }}
              >
                {t}
              </span>
            ))
          )}
        </div>
        <Link href="/tim-qua" className="text-[14px] font-semibold flex-shrink-0">
          Chỉnh sửa tìm kiếm
        </Link>
      </div>

      <section className="px-9 pt-11 pb-20 md:px-[72px] flex flex-col gap-7">
        <h1 className="text-[26px]">{products.length} set quà phù hợp với bạn</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((g) => (
            <div key={g.id} className="bg-surface border border-line rounded-2xl overflow-hidden flex flex-col">
              <div className="h-[170px] flex items-center justify-center" style={{ background: g.color }}>
                <GiftIcon size={40} color="white" strokeWidth={1.4} />
              </div>
              <div className="p-5 flex flex-col gap-1.5 flex-1">
                <p className="font-serif font-semibold text-[17px]">{g.name}</p>
                <p className="text-ink-soft text-[13.5px] leading-relaxed flex-1">{g.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[15px]">{g.price_display}</span>
                  <LeadFormTrigger
                    productId={g.id}
                    productLabel={`${g.name} · ${g.price_display}`}
                    triggerLabel="Chọn set này"
                    source="ket-qua-wizard"
                    triggerClassName="bg-accent text-accent-ink rounded-lg px-[18px] py-3.5 text-[13.5px] font-semibold min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
