import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import type { BaiViet } from "@/lib/baiViet";

// Ô lớn khu "Kiến thức chọn quà" ở trang chủ — bài viết mới nhất (BAI_VIET[0]).
// Ảnh ở trên, chữ nằm trên dải trắng bên dưới: KHÔNG phủ lớp tối lên ảnh (ảnh
// có logo + QR in sẵn ở hai góc, và chị Nga đã từ chối lớp phủ tối trên ảnh
// sản phẩm). Khung ảnh đúng tỉ lệ gốc nên object-cover không cắt mất góc nào.
// Nút "Đọc bài viết" dính đáy thẻ (mt-auto) để khi thẻ kéo cao bằng cột bên
// cạnh thì nút vẫn nằm cuối.
export default function BaiVietCard({ bai, className = "" }: { bai: BaiViet; className?: string }) {
  return (
    <Link
      href={bai.href}
      className={`rounded-[20px] overflow-hidden border border-line bg-surface shadow-md flex flex-col ${className}`}
    >
      <span className="relative block w-full" style={{ aspectRatio: `${bai.anhRong} / ${bai.anhCao}` }}>
        <Image
          src={bai.anh}
          alt={bai.anhAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 30vw"
          className="object-cover"
        />
      </span>
      <span className="flex flex-col gap-2.5 p-5 flex-1">
        <span className="text-[11.5px] font-bold uppercase tracking-wide text-[#B45309]">
          Bài viết mới · {bai.chuyenMuc}
        </span>
        <span className="font-serif font-semibold text-[19px] leading-snug text-[#1A1006]">
          {bai.title}
        </span>
        <span className="text-[14px] leading-relaxed text-ink-soft">{bai.tomTat}</span>
        <span className="flex flex-col gap-1.5 mt-1">
          {bai.yChinh.map((y) => (
            <span key={y.tieuDe} className="flex items-start gap-2 text-[13.5px] font-semibold text-[#1A1006]">
              <span className="text-[#16A34A]" aria-hidden="true">
                ✓
              </span>
              {y.tieuDe}
            </span>
          ))}
        </span>
        {/* <span> vi ca the da la <Link> - khong long <a> trong <a>. Cung kieu
            nut vang "Xem chi tiet" o khu San pham noi bat. */}
        <span className="mt-auto pt-2 self-start">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-4 py-2.5 text-[14px] md:text-[15px] font-bold bg-[#FFC633] text-[#1A1006] shadow-md">
            Đọc bài viết
            <ArrowRightIcon size={15} color="currentColor" />
          </span>
        </span>
      </span>
    </Link>
  );
}
