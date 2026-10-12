import Link from "next/link";
import { ArrowRightIcon, ZaloIcon } from "@/components/icons";
import { ZALO_URL } from "@/lib/contact";
import { LICH_GO } from "@/lib/lichGo";

// Khối nổi bật ĐẦU trang chủ (12/10/2026, chị Nga): mở web trên máy tính hay điện thoại đều thấy ngay
// bài Lịch gỗ để bàn 2027. Điện thoại: tiêu đề -> video -> nút; máy tính: chữ trái, video phải.
export default function LichGoNoiBat() {
  return (
    <section className="bg-[linear-gradient(135deg,#1F3448_0%,#0E2A44_60%,#3A1E14_100%)] text-white">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-12 px-5 py-6 md:px-[72px] md:py-10">
        <div className="flex-1 flex flex-col gap-3 md:gap-4 items-center md:items-start text-center md:text-left">
          <span className="inline-flex px-3 py-1 rounded-full text-[12.5px] font-bold bg-[#E5322D] text-white badge-noi-bat">
            MỚI · Tết Đinh Mùi 2027
          </span>
          <h2 className="font-serif leading-[1.15]">
            <span className="block text-[30px] md:text-[44px] text-[#FFD84D]">{LICH_GO.tieuDe}</span>
            <span className="block text-[15px] md:text-[19px] mt-1.5 font-normal text-white/90">{LICH_GO.phuDe}</span>
          </h2>
          <p className="hidden md:block text-[15.5px] text-white/85 max-w-[520px]">{LICH_GO.moDau}</p>
          <ul className="hidden md:flex flex-col gap-1.5 text-[15px] text-white/90">
            {LICH_GO.diemNhan.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="text-[#FFD84D]">✓</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="hidden md:flex flex-wrap gap-3 pt-1">
            <NutXem />
            <NutZalo />
          </div>
        </div>
        <div className="flex justify-center md:shrink-0">
          <video
            className="rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] h-[440px] md:h-[560px] w-auto aspect-[9/16] bg-black"
            src={LICH_GO.video}
            poster={LICH_GO.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Video lịch gỗ để bàn 2027 — hình ảnh mô phỏng 3D"
          />
        </div>
        <div className="flex md:hidden flex-col gap-2.5">
          <NutXem />
          <NutZalo />
        </div>
      </div>
    </section>
  );
}

function NutXem() {
  return (
    <Link
      href={LICH_GO.href}
      className="inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#FFC633] !text-[#1A1006] shadow-[0_4px_14px_rgba(255,198,51,0.35)] min-h-[48px]"
    >
      Xem chi tiết <ArrowRightIcon size={18} color="currentColor" />
    </Link>
  );
}

function NutZalo() {
  return (
    <a
      href={ZALO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[16px] font-bold bg-[#0068FF] !text-white min-h-[48px]"
    >
      <ZaloIcon size={20} />
      Nhận báo giá qua Zalo
    </a>
  );
}
