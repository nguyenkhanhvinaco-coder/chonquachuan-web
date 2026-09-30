import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { ZaloIcon, ArrowRightIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";
import { BAI_VIET } from "@/lib/baiViet";

// Trang cam on sau khi khach gui nhu cau o /tim-qua (2026-09-30).
// noindex: trang nay chi co nghia sau khi gui form, khong dua len Google.
export const metadata: Metadata = {
  title: "Cảm ơn bạn đã chia sẻ nhu cầu tìm quà",
  description: "Chọn Quà Chuẩn đã nhận nhu cầu tìm quà của bạn và sẽ nhanh chóng liên hệ tư vấn.",
  alternates: { canonical: "/tim-qua" },
  robots: { index: false, follow: true },
};

export default function CamOnPage() {
  return (
    <div className="flex flex-col">
      <Header />

      <section className="flex justify-center px-6 py-14 md:py-20">
        <div className="w-full max-w-[680px] flex flex-col items-center text-center gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-[30px] font-bold"
            style={{ background: "#DCFCE7", color: "#15803D" }}
            aria-hidden="true"
          >
            ✓
          </div>
          <h1 className="font-serif text-[28px] md:text-[38px] leading-tight [text-wrap:balance]">
            Cảm ơn Quý khách đã chia sẻ nhu cầu tìm quà
          </h1>
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-ink-soft max-w-[560px]">
            Chọn Quà Chuẩn đã nhận được thông tin. Chúng tôi sẽ nhanh chóng liên hệ qua số điện thoại / Zalo Quý khách
            để lại, gửi gợi ý quà phù hợp kèm báo giá.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold bg-accent text-accent-ink min-h-[44px]"
            >
              <ZaloIcon size={20} />
              Nhắn Zalo OA ngay
            </a>
            <a
              href={`tel:${HOTLINE_TEL}`}
              className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold border-2 border-line min-h-[44px]"
            >
              Hotline {HOTLINE}
            </a>
          </div>

          <div className="w-full text-left flex flex-col gap-3 pt-8">
            <h2 className="font-serif text-[20px]">Trong lúc chờ, mời Quý khách xem thêm</h2>
            <ul className="flex flex-col divide-y divide-line border border-line rounded-2xl bg-surface">
              {BAI_VIET.slice(0, 3).map((b) => (
                <li key={b.id}>
                  <Link
                    href={b.href}
                    className="flex items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-semibold"
                  >
                    {b.title}
                    <ArrowRightIcon size={15} color="currentColor" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/" className="text-ink-soft text-[14px] font-medium self-center pt-2">
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
