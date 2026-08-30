import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import LeadFormTrigger from "@/components/LeadForm";
import { GiftIcon } from "@/components/icons";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Gợi ý quà tặng cho bạn",
  description: "Kết quả gợi ý quà tặng theo tiêu chí bạn đã chọn tại Chọn Quà Chuẩn.",
  robots: { index: false, follow: true },
};

const STEP_ORDER = ["doi-tuong", "dip-tang", "ngan-sach", "so-luong", "phong-cach"] as const;

// Hai lối vào nhanh từ trang chủ (1 click). Danh sách sản phẩm hiện còn ít nên
// ta XẾP THỨ TỰ theo mức phù hợp thay vì lọc bỏ — lọc cứng sẽ ra trang gần trống
// (chỉ 1 sản phẩm mang nhãn "doi-tac"). Khi có đủ sản phẩm thật thì đổi sang lọc.
const AUDIENCES = {
  "ca-nhan": {
    label: "Cá nhân & người thân",
    priority: ["vat-ly", "qua-so", "doi-tac"],
  },
  "doanh-nghiep": {
    label: "Doanh nghiệp & đối tác",
    priority: ["doi-tac", "vat-ly", "qua-so"],
  },
} as const;

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const all = await getProducts();

  const doiTuong = searchParams["doi-tuong"];
  const audienceKey = typeof doiTuong === "string" ? doiTuong : "";
  const audience = AUDIENCES[audienceKey as keyof typeof AUDIENCES];

  const products = audience
    ? [...all].sort((a, b) => {
        const rank = (c: string) => {
          const i = audience.priority.indexOf(c as never);
          return i === -1 ? 99 : i;
        };
        return rank(a.category) - rank(b.category);
      })
    : all;

  // Lối vào nhanh chỉ có 1 tiêu chí; lối wizard cũ vẫn hiển thị đủ các nhãn đã chọn.
  const tags = audience
    ? [audience.label]
    : STEP_ORDER.map((key) => searchParams[key]).filter(
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
        <div className="flex flex-col gap-1.5">
          <h1 className="text-[26px]">
            {audience ? `Gợi ý quà cho ${audience.label.toLowerCase()}` : "Gợi ý quà cho bạn"}
          </h1>
          <p className="text-ink-soft text-[14.5px]">
            {products.length} set quà đang có — xếp theo mức phù hợp với nhu cầu của bạn.
          </p>
        </div>
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
