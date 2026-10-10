"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ZaloIcon, XIcon } from "@/components/icons";
import { ZALO_URL } from "@/lib/contact";

// Lưới mẫu lịch: bấm 1 mẫu -> mở ảnh lớn (có dải QR web + Zalo OA in sẵn trong ảnh),
// có nút trước/sau, phím ← → và Esc. Ảnh lớn chỉ tải khi mở.
type Props = {
  ten: string;
  anhNho: string[];
  anhLon: string[];
  rong: number;
  cao: number;
  nhoCao: number;
};

export default function MauLichGallery({ ten, anhNho, anhLon, rong, cao, nhoCao }: Props) {
  const [mo, setMo] = useState<number | null>(null);
  const n = anhLon.length;
  const doi = useCallback((b: number) => setMo((i) => (i === null ? i : (i + b + n) % n)), [n]);

  useEffect(() => {
    if (mo === null) return;
    const phim = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMo(null);
      if (e.key === "ArrowRight") doi(1);
      if (e.key === "ArrowLeft") doi(-1);
    };
    document.addEventListener("keydown", phim);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", phim);
      document.body.style.overflow = "";
    };
  }, [mo, doi]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {anhNho.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setMo(i)}
            className="group min-w-0 text-left rounded-2xl border border-line bg-surface overflow-hidden hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow"
          >
            <Image
              unoptimized
              src={src}
              alt={`${ten} 2027 — mẫu ${i + 1}`}
              width={1280}
              height={nhoCao}
              sizes="(min-width:1280px) 30vw, (min-width:640px) 45vw, 100vw"
              className="w-full h-auto block"
              loading={i < 3 ? "eager" : "lazy"}
            />
            <span className="flex items-center justify-between px-4 py-2.5 text-[14px]">
              <b className="text-ink">Mẫu {i + 1}</b>
              <span className="text-[#C8102E] font-bold group-hover:underline">Xem lớn</span>
            </span>
          </button>
        ))}
      </div>

      {mo !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${ten} — mẫu ${mo + 1}`}
          className="fixed inset-0 z-50 bg-black/85 flex flex-col"
          onClick={() => setMo(null)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
            <b className="text-[15px]">
              {ten} — mẫu {mo + 1} / {n}
            </b>
            <button
              type="button"
              onClick={() => setMo(null)}
              aria-label="Đóng"
              className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/15"
            >
              <XIcon size={22} color="#fff" />
            </button>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center px-2 md:px-16 relative">
            <Image
              unoptimized
              key={anhLon[mo]}
              src={anhLon[mo]}
              alt={`${ten} 2027 — mẫu ${mo + 1}, kèm mã QR website và Zalo OA Chọn Quà Chuẩn`}
              width={rong}
              height={cao}
              sizes="100vw"
              quality={85}
              className="max-h-full w-auto h-auto max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              priority
            />
            {n > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Mẫu trước"
                  onClick={(e) => (e.stopPropagation(), doi(-1))}
                  className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black text-[24px] font-bold"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Mẫu sau"
                  onClick={(e) => (e.stopPropagation(), doi(1))}
                  className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black text-[24px] font-bold"
                >
                  ›
                </button>
              </>
            )}
          </div>
          <div className="flex flex-col items-center gap-1.5 px-4 py-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-white/80 text-[13px] text-center">
              Khi nhắn, ghi mã MS in trên lịch (ví dụ: MS PN 102) để được báo giá nhanh.
            </span>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-[#0068FF] !text-white min-h-[44px]"
            >
              <ZaloIcon size={20} />
              Nhận báo giá mẫu này qua Zalo
            </a>
          </div>
        </div>
      )}
    </>
  );
}
