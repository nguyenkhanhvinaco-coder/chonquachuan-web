"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { ZALO_URL } from "@/lib/contact";

// Form don gian, LUON HIEN san tren trang (khong qua modal/nut bam trung
// gian) - thay cho luong "tra loi vai cau hoi" cu. Dung chung bang `leads`
// va logic luu voi LeadFormTrigger (product_ref co dinh "tu-van-chung" vi
// day la form tu van chung, khong gan voi 1 san pham cu the).
export default function InlineLeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !consent) return;
    setStatus("submitting");

    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      product_ref: "tu-van-chung",
      source: "trang-chu-hero",
      consent_at: new Date().toISOString(),
      consent_policy_version: PRIVACY_POLICY_VERSION,
    });

    setStatus(error ? "error" : "done");
  }

  if (status === "done") {
    return (
      <div className="bg-surface border border-line rounded-2xl p-6 flex flex-col gap-2.5">
        <p className="font-semibold">Đã gửi thông tin thành công!</p>
        <p className="text-ink-soft text-sm">
          Chúng tôi sẽ liên hệ lại bạn sớm nhất qua số điện thoại/Zalo đã cung cấp.
        </p>
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 bg-accent text-accent-ink rounded-[10px] py-3.5 font-semibold text-[15px] text-center min-h-[44px]"
        >
          Nhắn Zalo ngay →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">Họ và tên</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
        />
      </div>
      <div>
        <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">Số điện thoại / Zalo</label>
        <input
          required
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09xx xxx xxx"
          className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer py-1">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 accent-[oklch(0.62_0.16_40)]"
        />
        <span className="text-ink-soft text-[12.5px] leading-relaxed">
          Tôi đồng ý để Chọn Quà Chuẩn thu thập và sử dụng thông tin trên nhằm liên hệ tư vấn, theo{" "}
          <Link href="/chinh-sach-du-lieu-ca-nhan" target="_blank" className="font-semibold underline">
            Chính sách bảo vệ dữ liệu cá nhân
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting" || !consent}
        className="bg-accent text-accent-ink rounded-[10px] py-[15px] text-[15px] font-semibold w-full mt-1 disabled:opacity-60"
      >
        {status === "submitting" ? "Đang gửi..." : "Nhận tư vấn chọn quà"}
      </button>
      {status === "error" && (
        <p className="text-sm text-center" style={{ color: "oklch(0.55 0.18 25)" }}>
          Có lỗi khi gửi yêu cầu, bạn thử lại giúp mình nhé.
        </p>
      )}
    </form>
  );
}
