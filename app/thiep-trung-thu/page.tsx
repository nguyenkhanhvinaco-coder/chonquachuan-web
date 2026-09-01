"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { TRUNG_THU_CARDS } from "@/lib/trungThuCards";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

export default function ThiepTrungThuPage() {
  const router = useRouter();
  const [tranh, setTranh] = useState<string>("");
  const [tu, setTu] = useState("");
  const [den, setDen] = useState("");
  const [phone, setPhone] = useState("");
  const [loiNhan, setLoiNhan] = useState("");
  const [loiNhanTouched, setLoiNhanTouched] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const card = TRUNG_THU_CARDS.find((c) => c.id === tranh);

  function pickCard(id: string) {
    setTranh(id);
    if (!loiNhanTouched) {
      const c = TRUNG_THU_CARDS.find((x) => x.id === id);
      if (c) setLoiNhan(c.defaultMessage);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tranh || !tu || !den || !phone || !consent) return;
    setStatus("submitting");

    if (supabase) {
      await supabase.from("leads").insert({
        name: tu,
        phone,
        note: `Thiệp Trung Thu (tranh bé vẽ) — tranh: ${card?.name ?? tranh} | gửi tới: ${den}${
          loiNhan ? ` | lời nhắn: ${loiNhan}` : ""
        }`,
        product_ref: `thiep-trung-thu-${tranh}`,
        source: "trung-thu-2026-tranh-be",
        consent_at: new Date().toISOString(),
        consent_policy_version: PRIVACY_POLICY_VERSION,
      });
    }

    const params = new URLSearchParams({ tranh, tu, den });
    if (loiNhan) params.set("loi-nhan", loiNhan);
    router.push(`/thiep-trung-thu/xem?${params.toString()}`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header minimal />

      <div className="flex-1 flex justify-center px-6 py-14">
        <div className="w-full max-w-[640px] flex flex-col gap-9">
          <div className="flex flex-col gap-3">
            <span className="text-ink-soft text-[13px] font-semibold uppercase tracking-wide">
              Trung Thu 2026 · Miễn phí
            </span>
            <h1 className="font-serif text-[28px] md:text-[32px] leading-snug">
              Thiệp Trung Thu vẽ bởi một bạn nhỏ thật
            </h1>
            <p className="text-ink-soft text-[15px] leading-relaxed">
              Mỗi bức dưới đây là tranh thật — không phải minh hoạ máy vẽ — do chính con gái nhà
              sáng lập Chọn Quà Chuẩn thực hiện. Chọn 1 bức, điền vài thông tin, gửi tặng người
              thân qua Zalo.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-ink-soft">
              1. Chọn một bức tranh
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {TRUNG_THU_CARDS.map((c) => {
                const selected = tranh === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => pickCard(c.id)}
                    className="flex flex-col gap-1.5 text-left"
                  >
                    <div
                      className="relative aspect-[3/4] rounded-xl overflow-hidden border-[2.5px]"
                      style={{ borderColor: selected ? "var(--accent)" : "var(--line)" }}
                    >
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 640px) 33vw, 160px"
                        className="object-cover"
                      />
                      {selected && (
                        <div
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "var(--accent)" }}
                        >
                          <CheckIcon size={13} color="var(--accent-ink)" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span
                      className="text-[11.5px] font-semibold leading-tight"
                      style={{ color: selected ? "var(--ink)" : "var(--ink-soft)" }}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <span className="text-[13px] font-semibold text-ink-soft -mb-2">
              2. Điền thông tin
            </span>
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
                Lời nhắn
              </label>
              <textarea
                rows={3}
                maxLength={220}
                value={loiNhan}
                onChange={(e) => {
                  setLoiNhan(e.target.value);
                  setLoiNhanTouched(true);
                }}
                placeholder="Chọn một bức tranh ở trên để có gợi ý lời chúc phù hợp"
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
              <p className="text-ink-soft text-xs mt-1.5">
                Đã điền sẵn lời chúc gợi ý theo tranh bạn chọn — sửa lại thoải mái.
              </p>
            </div>
            <div>
              <label className="text-[13px] font-semibold text-ink-soft mb-1.5 block">
                Số điện thoại / Zalo của bạn
              </label>
              <input
                required
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className="w-full border border-line rounded-[9px] px-3.5 py-3.5 bg-surface text-[15px]"
              />
              <p className="text-ink-soft text-xs mt-1.5">
                Dùng để gửi ưu đãi Trung Thu &amp; Tết dành riêng cho bạn — không dùng vào việc
                khác.
              </p>
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
              disabled={status === "submitting" || !tranh || !consent}
              className="bg-accent text-accent-ink rounded-[10px] py-4 text-[15px] font-semibold w-full mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === "submitting" ? "Đang tạo thiệp..." : "Tạo thiệp miễn phí"}
              <ArrowRightIcon size={17} />
            </button>
            {!tranh && (
              <p className="text-ink-soft text-xs text-center -mt-2">
                Chọn một bức tranh ở trên trước khi gửi.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
