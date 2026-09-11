"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EBOOKS } from "@/lib/ebook";
import { ArrowRightIcon } from "./icons";

// The quang ba Ebook o trang chu — dung anh bia that (khong con la khoi mau
// phang). Chi co 1 cuon thi hien tinh; tu dong chay luan phien (crossfade)
// qua bia cua tat ca cuon trong EBOOKS khi co tu 2 cuon tro len, khong can
// sua gi them khi them ebook moi vao lib/ebook.ts.
type Props = {
  // O to (khu Hero trang chu, thay cho video) hay o nho (canh video) —
  // dieu khien chieu cao toi thieu; vi tri trong luoi (order/row-span) do
  // trang goi component tu quyet dinh qua className.
  large?: boolean;
  className?: string;
};

export default function EbookCoverCard({ large = false, className = "" }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (EBOOKS.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % EBOOKS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = EBOOKS[index];

  return (
    <Link
      href={current.href}
      // Mobile cao 370px (truoc 240px): them nut "Doc Ebook mien phi" o day
      // the, chu + nut chiem ~200px - thap hon thi chu de len het tranh bia
      // (da thu 300px: nhan "Mien phi doc" van lan vao bien so 10 cua tranh).
      className={`relative rounded-[20px] flex overflow-hidden ${
        large ? "min-h-[370px] md:min-h-[420px]" : "min-h-[200px]"
      } ${className}`}
      style={{ background: "#1C4A63" }}
    >
      {EBOOKS.map((book, i) => (
        <Image
          key={book.id}
          src={book.cover}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,15,10,0.82) 0%, rgba(20,15,10,0.35) 45%, rgba(20,15,10,0) 70%)",
        }}
      />
      <span className="relative z-10 flex flex-col justify-end w-full rounded-[20px] p-5 md:p-6">
        <span className="text-[11.5px] font-bold text-white/80 uppercase tracking-wide">
          Miễn phí đọc
        </span>
        <span className="font-serif font-semibold text-white text-base mt-2.5">
          {current.title}
        </span>
        <span className="text-sm mt-1.5 text-white/85">{current.subtitle}</span>
        {/* Nut that su (them 2026-09-11 theo yeu cau): truoc chi co dong chu nho
            "... doc ngay ->" nen nguoi xem khong nhan ra bam duoc. Dung <span>
            vi ca the da la mot <Link> - khong long <a> trong <a>. Cung kieu vang
            voi nut "Xem chi tiet" o khu San pham noi bat. */}
        <span className="mt-3.5 self-start inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 py-2.5 text-[14px] md:text-[15px] font-bold bg-[#FFC633] text-[#1A1006] shadow-md">
          Đọc Ebook miễn phí
          <ArrowRightIcon size={15} color="currentColor" />
        </span>
      </span>
    </Link>
  );
}
