"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { XIcon } from "./icons";

type Props = {
  productId: string;
  productLabel: string;
  triggerLabel: string;
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
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setStatus("submitting");

    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      note: note || null,
      product_ref: productId,
      source,
    });

    setStatus(error ? "error" : "done");
  }

  function closeAndReset() {
    setOpen(false);
    setStatus("idle");
    setName("");
    setPhone("");
    setEmail("");
    setNote("");
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
                <h2 className="font-serif text-xl">Gửi yêu cầu đặt hàng</h2>
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
              <div className="flex flex-col gap-2 py-4">
                <p className="font-semibold">Đã gửi yêu cầu thành công!</p>
                <p className="text-ink-soft text-sm">
                  Chúng tôi sẽ liên hệ lại bạn sớm nhất qua số điện thoại đã cung cấp.
                </p>
                <button
                  onClick={closeAndReset}
                  className="mt-3 bg-accent text-accent-ink rounded-[10px] py-3.5 font-semibold text-[15px]"
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
                    Số điện thoại
                  </label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                    Email (tuỳ chọn)
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@congty.vn"
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                    Ghi chú thêm (tuỳ chọn)
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Yêu cầu in logo, thời hạn giao hàng..."
                    className="w-full border border-line rounded-[9px] px-3.5 py-3 bg-surface text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
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
