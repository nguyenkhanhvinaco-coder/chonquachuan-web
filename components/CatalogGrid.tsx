"use client";

import { useState } from "react";
import { GiftIcon } from "./icons";
import LeadFormTrigger from "./LeadForm";
import type { Product } from "@/lib/products";

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "vat-ly", label: "Set quà vật lý" },
  { id: "qua-so", label: "Quà tặng số" },
  { id: "doi-tac", label: "Combo doanh nghiệp" },
] as const;

export default function CatalogGrid({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  const visible = tab === "all" ? products : products.filter((p) => p.category === tab);

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
            <div className="h-[150px] relative flex items-center justify-center" style={{ background: p.color }}>
              {p.is_digital && (
                <span className="absolute top-2.5 left-2.5 bg-ink text-bg text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Tải về ngay
                </span>
              )}
              <GiftIcon size={34} color="white" strokeWidth={1.4} />
            </div>
            <div className="p-4 flex flex-col gap-1.5 flex-1">
              <p className="font-serif font-semibold text-[14.5px]">{p.name}</p>
              <p className="text-ink-soft text-[12.5px] flex-1">{p.description}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="font-bold text-[14.5px]">{p.price_display}</span>
                <LeadFormTrigger
                  productId={p.id}
                  productLabel={`${p.name} · ${p.price_display}`}
                  triggerLabel={p.is_digital ? "Mua ngay" : "Thêm vào giỏ"}
                  source="catalog"
                  triggerClassName={
                    p.is_digital
                      ? "border border-ink text-ink rounded-lg px-3.5 py-3.5 text-[12.5px] font-semibold min-h-11"
                      : "bg-accent text-accent-ink rounded-lg px-3.5 py-3.5 text-[12.5px] font-semibold min-h-11"
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
