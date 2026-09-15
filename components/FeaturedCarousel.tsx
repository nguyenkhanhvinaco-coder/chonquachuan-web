"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GiftIcon } from "./icons";

export type FeaturedTile = {
  key: string;
  href: string;
  image?: string;
  name: string;
  bg: string;
};

// Khu "San pham noi bat" dau trang chu: cac o CHAY LUAN PHIEN (yeu cau chi Nga
// 2026-09-15). Hien 2 o tren dien thoai, 3 o tu man hinh md; cu KHOANG ms truot
// sang 1 o, het vong thi quay lai tu dau. Nhan ban vai o dau dat o cuoi day de
// vong lap lien mach: truot toi ban sao roi nhay ve o that (khong hieu ung).
// Dung chay khi re chuot / cham vao. Nguoi xem bat "giam chuyen dong" (vd Windows
// tat hieu ung - MAY CHI NGA DANG TAT, kiem tra 2026-09-15) thi VAN doi o luan phien
// nhung doi ngay, khong truot; neu dung han o che do nay chi Nga se tuong web hong.
const KHOANG = 3500;
const TRUOT = 700; // ms, thoi gian mot lan truot
const NHAN_BAN = 3; // bang so o hien toi da (man hinh md: 3 o)

export default function FeaturedCarousel({ tiles }: { tiles: FeaturedTile[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(true);
  const [step, setStep] = useState(0);
  const [perView, setPerView] = useState(3);
  const [dung, setDung] = useState(false);
  const [giam, setGiam] = useState(false);
  const chay = tiles.length > perView;

  // Do be rong 1 buoc (1 o + khoang cach) theo bo cuc that; tinh lai khi doi co man hinh.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const doLai = () => {
      const a = el.children[0] as HTMLElement | undefined;
      const b = el.children[1] as HTMLElement | undefined;
      if (a && b) setStep(b.offsetLeft - a.offsetLeft);
      setPerView(window.matchMedia("(min-width: 768px)").matches ? 3 : 2);
    };
    setGiam(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    doLai();
    const ro = new ResizeObserver(doLai);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!chay || dung) return;
    const t = setInterval(() => {
      setAnim(true);
      // Giam chuyen dong: doi ngay, quay vong bang phep chia du (khong can ban sao).
      // Binh thuong: truot sang o ke; neu lan quay vong truoc bi lo (tab bi an nen
      // khong co transitionend) thi nhay tiep tu o that, khong truot ra vung trong.
      setIdx((i) => (giam ? (i + 1) % tiles.length : i >= tiles.length ? i - tiles.length + 1 : i + 1));
    }, KHOANG);
    return () => clearInterval(t);
  }, [chay, dung, giam, tiles.length]);

  // Truot toi ban sao cuoi day -> truot xong thi nhay ve o that tuong ung (khong
  // hieu ung). Dung hen gio chu KHONG dung su kien transitionend: su kien do khong
  // ban khi tab bi an (kiem thu 2026-09-15 thay day dung o ban sao, lan sau truot
  // nguoc 3 o).
  useEffect(() => {
    if (idx < tiles.length) return;
    const t = setTimeout(() => {
      setAnim(false);
      setIdx((i) => (i >= tiles.length ? i - tiles.length : i));
    }, giam ? 0 : TRUOT + 30);
    return () => clearTimeout(t);
  }, [idx, tiles.length, giam]);

  const hien = chay ? [...tiles, ...tiles.slice(0, NHAN_BAN)] : tiles;
  const dangXem = idx % tiles.length;

  return (
    <div
      className="flex-1 w-full min-w-0"
      onMouseEnter={() => setDung(true)}
      onMouseLeave={() => setDung(false)}
      onFocus={() => setDung(true)}
      onBlur={() => setDung(false)}
    >
      {/* py/px + am margin: chua cho bong do (shadow-lg) cua the, khong bi
          overflow-hidden cat mat. */}
      <div className="overflow-hidden py-3 -my-3 px-1 -mx-1">
        {/* items-stretch (mac dinh) + h-full o tung the: cac o BANG chieu cao
            nhau nen nut "Xem chi tiet" thang hang du ten dai ngan khac nhau. */}
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4"
          style={{
            transform: `translateX(-${idx * step}px)`,
            transition: anim && !giam ? `transform ${TRUOT}ms cubic-bezier(.22,.61,.36,1)` : "none",
          }}
        >
          {hien.map((t, i) => {
            const banSao = i >= tiles.length;
            return (
              <Link
                key={`${t.key}-${i}`}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={banSao || undefined}
                tabIndex={banSao ? -1 : undefined}
                className="shrink-0 basis-[calc((100%_-_0.75rem)/2)] md:basis-[calc((100%_-_2rem)/3)] rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex flex-col"
              >
                <span className="relative block aspect-[4/3]" style={{ background: t.bg }}>
                  {/* object-contain: anh san pham co logo/QR in san o goc,
                      doi sang object-cover la cat mat. */}
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 24vw"
                      className="object-contain"
                      priority={i === 0}
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <GiftIcon size={40} color="white" strokeWidth={1.3} />
                    </span>
                  )}
                </span>
                <span className="flex flex-col gap-2 px-2.5 py-2.5 md:px-3 md:py-3 flex-1">
                  <span className="text-[13.5px] md:text-[16.5px] font-bold leading-snug text-[#DC2626] flex-1">
                    {t.name}
                  </span>
                  {/* whitespace-nowrap + dem ngang hep o mobile: cot chi rong
                      ~140px tren dien thoai, de mac dinh thi chu nut vo lam
                      hai dong ("Xem chi" / "tiet"). */}
                  <span className="inline-flex items-center justify-center gap-1 md:gap-1.5 whitespace-nowrap rounded-[10px] px-2 md:px-3 py-2.5 md:py-3 text-[13px] md:text-[16px] font-bold bg-[#FFC633] text-[#1A1006]">
                    Xem chi tiết
                    <ArrowRightIcon size={15} color="currentColor" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {chay && (
        <div className="flex justify-center gap-2 mt-4">
          {tiles.map((t, k) => (
            <button
              key={t.key}
              type="button"
              aria-label={`Xem ${t.name}`}
              aria-current={k === dangXem || undefined}
              onClick={() => {
                setAnim(true);
                setIdx(k);
              }}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: k === dangXem ? 22 : 8,
                background: k === dangXem ? "#DC2626" : "rgba(255,255,255,0.85)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
