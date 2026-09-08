"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { ZALO_URL } from "@/lib/contact";
import { EBOOK_PRICE_VND, EBOOK_PRODUCT_REF } from "@/lib/ebook";
import { XIcon } from "./icons";

// Tải file PDF không tự phục vụ (không có nút tải trực tiếp) — khách để lại
// email hoặc Zalo, nhân viên Chọn Quà Chuẩn gửi số tài khoản để chuyển khoản
// 5.000đ rồi gửi file qua đúng kênh khách cung cấp. Dùng chung bảng `leads`
// và cách lưu consent như LeadFormTrigger, nhưng field khác: không bắt buộc
// điện thoại, cho phép chỉ để lại email — cần ít nhất 1 trong 2.
export default function EbookLeadForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zalo, setZalo] = useState("");
  const [consent, setConsent] = useState(false);

  const missingContact = !email.trim() && !zalo.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || missingContact || !consent) return;
    setStatus("submitting");

    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name,
      phone: zalo || "",
      email: email || null,
      product_ref: EBOOK_PRODUCT_REF,
      source: "ebook-tai-pdf",
      note: `Muốn tải file PDF ebook (${EBOOK_PRICE_VND.toLocaleString("vi-VN")}đ) — gửi số tài khoản để khách chuyển khoản, rồi gửi file qua email/Zalo khách để lại.`,
      consent_at: new Date().toISOString(),
      consent_policy_version: PRIVACY_POLICY_VERSION,
    });

    setStatus(error ? "error" : "done");
  }

  function closeAndReset() {
    setOpen(false);
    setStatus("idle");
    setName("");
    setEmail("");
    setZalo("");
    setConsent(false);
  }

  return (
    <div className="rounded-xl border border-line bg-surface-2 px-6 py-6 flex flex-col gap-3 max-w-[420px]">
      <span className="font-serif text-lg">Tải bản PDF về máy</span>
      <p className="text-ink-soft text-sm leading-relaxed">
        Đọc trên web hoàn toàn miễn phí. Muốn lưu file PDF về máy, để lại email hoặc Zalo — chúng
        tôi gửi số tài khoản để bạn chuyển khoản{" "}
        <b className="text-ink">{EBOOK_PRICE_VND.toLocaleString("vi-VN")}đ</b> (trích vào Quỹ xã
        hội của Chọn Quà Chuẩn), rồi gửi file PDF qua đúng kênh bạn để lại.
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-accent text-accent-ink rounded-lg px-5 py-3 text-sm font-semibold min-h-[44px]"
      >
        Liên hệ để tải file PDF
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0.2 0.02 50 / 55%)" }}
        >
          <div className="w-full max-w-[460px] bg-surface rounded-2xl p-8 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-xl">Nhận file PDF ebook</h2>
                <p className="text-ink-soft text-[13.5px]">
                  10 bài học kinh doanh từ Chung Ju Yung
                </p>
              </div>
              <button
                onClick={closeAndReset}
                className="text-ink-soft w-11 h-11 flex items-center justify-center flex-shrink-0"
                aria-label="Đóng"
              >
                <XIcon />
              </button>
            </div>

            {status === "done" ? (
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Đã ghi nhận yêu cầu!</p>
                <p className="text-ink-soft text-sm">
                  Nhân viên Chọn Quà Chuẩn sẽ gửi số tài khoản ngân hàng qua{" "}
                  {email && zalo ? "email/Zalo" : email ? "email" : "Zalo"} bạn để lại. Sau khi
                  nhận được chuyển khoản, chúng tôi gửi ngay file PDF cho bạn.
                </p>
                <p className="text-ink-soft text-sm">Cần nhanh hơn? Nhắn Zalo cho chúng tôi.</p>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 bg-accent text-accent-ink rounded-[10px] py-3.5 font-semibold text-[15px] text-center min-h-[44px]"
                >
                  Nhắn Zalo ngay →
                </a>
                <button
                  onClick={closeAndReset}
                  className="text-ink-soft py-3 font-semibold text-[14px] min-h-[44px]"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                    Họ và tên
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com"
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                    Số điện thoại / Zalo
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={zalo}
                    onChange={(e) => setZalo(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>
                {missingContact && (email || zalo || name) && (
                  <p className="text-ink-soft text-xs -mt-2">Để lại ít nhất email hoặc Zalo nhé.</p>
                )}

                <label className="flex items-start gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 accent-[oklch(0.62_0.16_40)]"
                  />
                  <span className="text-ink-soft text-[12.5px] leading-relaxed">
                    Tôi đồng ý để Chọn Quà Chuẩn thu thập và sử dụng thông tin trên nhằm liên hệ gửi
                    file, theo{" "}
                    <Link
                      href="/chinh-sach-du-lieu-ca-nhan"
                      target="_blank"
                      className="font-semibold underline"
                    >
                      Chính sách bảo vệ dữ liệu cá nhân
                    </Link>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting" || !consent || !name || missingContact}
                  className="bg-accent text-accent-ink rounded-[10px] py-[15px] text-[15px] font-semibold w-full mt-1 disabled:opacity-60"
                >
                  {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-center" style={{ color: "oklch(0.55 0.18 25)" }}>
                    Có lỗi khi gửi yêu cầu, bạn thử lại giúp mình nhé.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
