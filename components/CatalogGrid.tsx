"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiftIcon } from "./icons";
import LeadFormTrigger from "./LeadForm";
import { productInCategory, type Product } from "@/lib/products";

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "vat-ly", label: "Set quà vật lý" },
  { id: "qua-so", label: "Quà tặng số" },
  { id: "doi-tac", label: "Combo doanh nghiệp" },
] as const;

export default function CatalogGrid({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  // Loc qua productInCategory chu khong so sanh p.category === tab: mot san
  // pham co the thuoc nhieu danh muc (vd chai thuy tinh nam ca o "Set qua vat
  // ly" lan "Combo doanh nghiep"), so sanh truc tiep se bo sot.
  const visible = tab === "all" ? products : products.filter((p) => productInCategory(p, tab));

  return (
    <>
      <section className="px-9 pt-10 md:px-[72px] flex items-center gap-2 border-b border-line overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="py-3 px-1 mr-7 border-b-[2.5px] whitespace-nowrap"
            style={{
              borderColor: tab === t.id ? "var(--accent)" : "transparent",
            }}
          >
            <span
              className="text-[15px] font-semibold"
              style={{ color: tab === t.id ? "var(--ink)" : "var(--ink-soft)" }}
            >
              {t.label}
            </span>
          </button>
        ))}
      </section>

      <section className="px-9 pt-8 pb-14 md:px-[72px] grid grid-cols-2 md:grid-cols-4 gap-[22px]">
        {visible.map((p) => (
          <div key={p.id} className="bg-surface border border-line rounded-2xl overflow-hidden flex flex-col">
            {/* Bam vao anh/ten mo trang chi tiet o tab moi (kieu Etsy) - nut
                Nhan tu van van la button rieng, khong nam trong Link. */}
            <Link href={`/san-pham/${p.id}`} target="_blank" rel="noopener noreferrer" className="contents">
              <div className="h-[150px] relative flex items-center justify-center overflow-hidden" style={{ background: p.color }}>
                {p.is_digital && (
                  <span className="absolute top-2.5 left-2.5 bg-ink text-bg text-[11px] font-bold px-2.5 py-1 rounded-full z-10">
                    Tải về ngay
                  </span>
                )}
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain" />
                ) : (
                  <GiftIcon size={34} color="white" strokeWidth={1.4} />
                )}
              </div>
            </Link>
            <div className="p-4 flex flex-col gap-1.5 flex-1">
              <Link href={`/san-pham/${p.id}`} target="_blank" rel="noopener noreferrer">
                <p className="font-serif font-semibold text-[14.5px]">{p.name}</p>
              </Link>
              <p className="text-ink-soft text-[12.5px] flex-1">{p.description}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="font-bold text-[14.5px]">{p.price_display}</span>
                <LeadFormTrigger
                  productId={p.id}
                  productLabel={`${p.name} · ${p.price_display}`}
                  triggerLabel={p.is_digital ? "Đặt mua" : "Nhận tư vấn"}
                  source="catalog"
                  triggerClassName={
                    p.is_digital
                      ? "border border-ink text-ink rounded-lg px-3.5 py-3.5 text-[12.5px] font-semibold min-h-[44px]"
                      : "bg-accent text-accent-ink rounded-lg px-3.5 py-3.5 text-[12.5px] font-semibold min-h-[44px]"
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
