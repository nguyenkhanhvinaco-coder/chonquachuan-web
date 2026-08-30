"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { ZALO_URL } from "@/lib/contact";
import { XIcon } from "./icons";

type Props = {
  productId: string;
  productLabel: string;
  // ReactNode chứ không chỉ string: khu sản phẩm nổi bật ở trang chủ dùng cả
  // thẻ sản phẩm làm nút bấm (chỉ dùng <span>, không dùng <div>, để HTML hợp lệ
  // bên trong <button>).
  triggerLabel: React.ReactNode;
  triggerClassName: string;
  source: string;
};

export default function LeadFormTrigger({
  productId,
  productLabel,
  triggerLabel,
  triggerClassName,
  source,
}: Props) {
  const [open, setOpen] = useState(false);
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

    // consent_at / consent_policy_version: bằng chứng khách đã đồng ý, vào lúc nào,
    // với phiên bản chính sách nào — xem supabase/schema.sql (phải chạy migration
    // thêm 2 cột này trước khi deploy, nếu không insert sẽ lỗi).
    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      product_ref: productId,
      source,
      consent_at: new Date().toISOString(),
      consent_policy_version: PRIVACY_POLICY_VERSION,
    });

    setStatus(error ? "error" : "done");
  }

  function closeAndReset() {
    setOpen(false);
    setStatus("idle");
    setName("");
    setPhone("");
    setConsent(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(0.2 0.02 50 / 55%)" }}
        >
          <div className="w-full max-w-[460px] bg-surface rounded-2xl p-8 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-xl">Gửi yêu cầu</h2>
                <p className="text-ink-soft text-[13.5px]">{productLabel}</p>
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
              // Lead đã lưu xong ở bước này. Đưa luôn nút Zalo để khách nào muốn
              // chốt ngay thì chat liền, không phải chờ gọi lại — nhưng thông tin
              // đã nằm trong CSDL rồi nên khách không nhắn cũng không mất dấu.
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Đã gửi yêu cầu thành công!</p>
                <p className="text-ink-soft text-sm">
                  Chúng tôi sẽ liên hệ lại bạn sớm nhất qua số điện thoại đã cung cấp.
                </p>
                <p className="text-ink-soft text-sm">
                  Cần tư vấn ngay? Nhắn Zalo cho chúng tôi, phản hồi nhanh hơn.
                </p>
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
                    Số điện thoại / Zalo
                  </label>
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
                    Tôi đồng ý để Chọn Quà Chuẩn thu thập và sử dụng thông tin trên nhằm liên hệ tư
                    vấn, theo{" "}
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
                  disabled={status === "submitting" || !consent}
                  className="bg-accent text-accent-ink rounded-[10px] py-[15px] text-[15px] font-semibold w-full mt-1 disabled:opacity-60"
                >
                  {status === "submitting" ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-center" style={{ color: "oklch(0.55 0.18 25)" }}>
                    Có lỗi khi gửi yêu cầu, bạn thử lại giúp mình nhé.
                  </p>
                )}
                <p className="text-ink-soft text-xs text-center">
                  Yêu cầu của bạn sẽ được chuyển đến nhà cung cấp phù hợp để báo giá.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
