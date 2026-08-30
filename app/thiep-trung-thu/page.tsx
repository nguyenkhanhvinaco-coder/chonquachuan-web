"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { ArrowRightIcon } from "@/components/icons";

export default function ThiepTrungThuPage() {
  const router = useRouter();
  const [tu, setTu] = useState("");
  const [den, setDen] = useState("");
  const [phone, setPhone] = useState("");
  const [loiNhan, setLoiNhan] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tu || !den || !phone) return;
    setStatus("submitting");

    if (supabase) {
      await supabase.from("leads").insert({
        name: tu,
        phone,
        note: `Thiệp Trung Thu — gửi tới: ${den}${loiNhan ? ` | Lời nhắn: ${loiNhan}` : ""}`,
        product_ref: "thiep-trung-thu",
        source: "trung-thu-2026-qr",
      });
    }

    const params = new URLSearchParams({ tu, den });
    if (loiNhan) params.set("loi-nhan", loiNhan);
    router.push(`/thiep-trung-thu/xem?${params.toString()}`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal />

      <div className="flex-1 flex justify-center px-6 py-14">
        <div className="w-full max-w-[520px] flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <span className="text-ink-soft text-[13px] font-semibold uppercase tracking-wide">
              Trung Thu 2026 · Miễn phí
            </span>
            <h1 className="font-serif text-[28px] md:text-[32px] leading-snug">
              Gửi một lời chúc thật lòng — không phải tin nhắn hàng loạt
            </h1>
            <p className="text-ink-soft text-[15px] leading-relaxed">
              Điền vài thông tin bên dưới, chúng tôi tạo ngay một thiệp Trung Thu có tên riêng để bạn
              gửi tặng qua Zalo. Xem xong bạn còn tải được ảnh thiệp đẹp về máy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">Tên bạn</label>
              <input
                required
                maxLength={40}
                value={tu}
                onChange={(e) => setTu(e.target.value)}
                placeholder="Ví dụ: Khánh Vi"
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                Tên người nhận
              </label>
              <input
                required
                maxLength={40}
                value={den}
                onChange={(e) => setDen(e.target.value)}
                placeholder="Ví dụ: Chị Hương"
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                Lời nhắn (tuỳ chọn)
              </label>
              <textarea
                rows={3}
                maxLength={200}
                value={loiNhan}
                onChange={(e) => setLoiNhan(e.target.value)}
                placeholder="Chúc chị một mùa trăng tròn đầy, an lành bên gia đình..."
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                Số điện thoại / Zalo của bạn
              </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
              <p className="text-ink-soft text-xs mt-1.5">
                Chúng tôi dùng số này để gửi ưu đãi Trung Thu &amp; Tết dành riêng cho bạn — không
                dùng vào việc khác.
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-accent text-accent-ink rounded-[10px] py-4 text-[15px] font-semibold w-full mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === "submitting" ? "Đang tạo thiệp..." : "Tạo thiệp miễn phí"}
              <ArrowRightIcon size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
