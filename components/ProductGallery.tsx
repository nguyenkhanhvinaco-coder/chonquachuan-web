"use client";

import { useState } from "react";
import Image from "next/image";
import { GiftIcon } from "./icons";

type Props = {
  images: string[];
  color: string;
  name: string;
  badge?: React.ReactNode;
};

export default function ProductGallery({ images, color, name, badge }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[480px] flex items-center justify-center"
        style={{ background: color }}
      >
        {badge}
        <GiftIcon size={64} color="white" strokeWidth={1.3} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative rounded-2xl overflow-hidden min-h-[300px] md:min-h-[480px] flex items-center justify-center"
        style={{ background: color }}
      >
        {badge}
        {/* object-contain (khong phai object-cover): anh san pham co logo/QR
            in san o goc, cat anh se che mat logo/QR - phai hien tron ven
            anh, du co vien mau xung quanh. */}
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2"
              style={{ borderColor: i === active ? "var(--ink)" : "transparent" }}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
