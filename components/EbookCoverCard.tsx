"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EBOOKS } from "@/lib/ebook";

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
      className={`relative rounded-[20px] flex overflow-hidden ${
        large ? "min-h-[240px] md:min-h-[420px]" : "min-h-[200px]"
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
            "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.15) 55%, rgba(20,15,10,0) 75%)",
        }}
      />
      <span className="relative z-10 flex flex-col justify-end w-full rounded-[20px] p-6">
        <span className="text-[11.5px] font-bold text-white/80 uppercase tracking-wide">
          Miễn phí đọc
        </span>
        <span className="font-serif font-semibold text-white text-base mt-2.5">
          {current.title}
        </span>
        <span className="text-sm mt-1.5 text-white/85">{current.subtitle} →</span>
      </span>
    </Link>
  );
}
