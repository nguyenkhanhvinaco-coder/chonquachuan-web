"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { ArrowRightIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { notifyLead } from "@/lib/leadNotify";

// 2026-09-30 (chi Nga): gom 5 buoc hoi vao MOT trang, khach chon nhanh roi de lai so dien
// thoai -> sang trang cam on (/tim-qua/cam-on). Truoc day la 5 man hinh lien tiep roi ra
// trang "ket qua" liet ke san pham — trang do hien ca san pham mau nen da bo.
// Nhu cau khach chon duoc ghi vao cot `note` cua bang leads + bao ve Sheet/email.
// cot: so cot cua luoi lua chon tren man hinh rong (de cac o deu nhau, thang hang).
type Nhom = { key: string; label: string; hoi: string; cot: 2 | 3 | 4; options: string[] };

const NHOM: Nhom[] = [
  {
    key: "doi-tuong",
    label: "Tặng cho ai",
    hoi: "Bạn muốn tặng quà cho ai?",
    cot: 4,
    options: ["Đối tác doanh nghiệp", "Khách hàng", "Nhân viên / đồng nghiệp", "Cá nhân / người thân"],
  },
  {
    key: "dip-tang",
    label: "Dịp tặng",
    hoi: "Tặng vào dịp nào?",
    cot: 3,
    options: ["Lễ / Tết", "Tri ân cuối năm", "Sự kiện / hội nghị", "Khai trương", "Sinh nhật", "Khác"],
  },
  {
    key: "ngan-sach",
    label: "Ngân sách mỗi phần quà",
    hoi: "Ngân sách cho mỗi phần quà?",
    cot: 3,
    options: ["Dưới 200.000đ", "200.000đ - 500.000đ", "500.000đ - 1.000.000đ", "Trên 1.000.000đ", "Chưa xác định"],
  },
  {
    key: "so-luong",
    label: "Số lượng",
    hoi: "Bạn cần bao nhiêu phần quà?",
    cot: 4,
    options: ["Dưới 10 phần", "10 - 50 phần", "50 - 100 phần", "Trên 100 phần"],
  },
  {
    key: "phong-cach",
    label: "Phong cách",
    hoi: "Phong cách quà bạn thích?",
    cot: 4,
    options: ["Sang trọng", "Ấm áp, gần gũi", "Trẻ trung, sáng tạo", "Tối giản"],
  },
];

export default function TimQuaPage() {
  const router = useRouter();
  const [chon, setChon] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [loiSdt, setLoiSdt] = useState(false);

  function pick(key: string, opt: string) {
    // bam lai lua chon dang chon thi bo chon
    setChon((c) => (c[key] === opt ? { ...c, [key]: "" } : { ...c, [key]: opt }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const soDt = phone.replace(/\D/g, "");
    if (soDt.length < 9 || soDt.length > 11) {
      setLoiSdt(true);
      return;
    }
    setLoiSdt(false);
    if (!consent) return;
    setStatus("submitting");

    if (!supabase) {
      setStatus("error");
      return;
    }

    const ten = name.trim() || "Khách tìm quà";
    const note = NHOM.filter((n) => chon[n.key])
      .map((n) => `${n.label}: ${chon[n.key]}`)
      .join(" · ");

    const { error } = await supabase.from("leads").insert({
      name: ten,
      phone: phone.trim(),
      note: note || null,
      product_ref: "tim-qua",
      source: "tim-qua",
      consent_at: new Date().toISOString(),
      consent_policy_version: PRIVACY_POLICY_VERSION,
    });

    if (error) {
      setStatus("error");
      return;
    }
    notifyLead({ name: ten, phone: phone.trim(), source: "tim-qua", product_ref: "tim-qua", note });
    router.push("/tim-qua/cam-on");
  }

  return (
    <div className="flex flex-col">
      <Header minimal />

      <form onSubmit={handleSubmit} className="flex-1 flex justify-center px-5 sm:px-6 py-8 md:py-12">
        <div className="w-full max-w-[920px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[28px] md:text-[36px] leading-tight">Bạn đang tìm quà tặng như thế nào?</h1>
            <p className="text-ink-soft text-[15px] md:text-[16px]">
              Bấm chọn 5 ý bên dưới (chưa tới 1 phút) rồi để lại số điện thoại — Chọn Quà Chuẩn sẽ gọi hoặc nhắn Zalo
              gợi ý quà phù hợp kèm báo giá.
            </p>
          </div>

          {/* 2026-09-30 (chi Nga: "de nhin va de chon hon"): moi cau hoi la mot khoi rieng co so thu
              tu + cau hoi chu lon; lua chon la cac O DEU NHAU xep luoi (khong con vien thuoc dai ngan
              xuong dong lon xon); o dang chon doi nen + co dau tich. */}
          <div className="flex flex-col gap-4">
            {NHOM.map((n, i) => {
              const daChon = Boolean(chon[n.key]);
              const luoi =
                n.cot === 4 ? "grid-cols-2 md:grid-cols-4" : n.cot === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2";
              return (
                <div
                  key={n.key}
                  role="group"
                  aria-label={n.label}
                  className="rounded-2xl border border-line bg-surface p-4 md:p-6 flex flex-col gap-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[14px] font-bold"
                      style={{
                        background: daChon ? "#15803D" : "var(--accent-soft)",
                        color: daChon ? "#fff" : "var(--accent)",
                      }}
                    >
                      {daChon ? "✓" : i + 1}
                    </span>
                    <h2 className="font-serif text-[19px] md:text-[22px] leading-snug">{n.hoi}</h2>
                  </div>
                  <div className={`grid ${luoi} gap-2.5`}>
                    {n.options.map((opt) => {
                      const dang = chon[n.key] === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => pick(n.key, opt)}
                          aria-pressed={dang}
                          className="flex items-center justify-between gap-2 rounded-xl border-[1.5px] px-3.5 py-3 text-left text-[14.5px] md:text-[15px] font-medium min-h-[52px] leading-snug"
                          style={{
                            borderColor: dang ? "var(--accent)" : "var(--line)",
                            background: dang ? "var(--accent-soft)" : "#fff",
                            boxShadow: dang ? "0 0 0 1.5px var(--accent)" : "none",
                          }}
                        >
                          {opt}
                          <span
                            className="w-5 h-5 shrink-0 rounded-full border-[1.5px] flex items-center justify-center text-[11px] font-bold"
                            style={{
                              borderColor: dang ? "var(--accent)" : "var(--line)",
                              background: dang ? "var(--accent)" : "transparent",
                              color: "var(--accent-ink)",
                            }}
                            aria-hidden="true"
                          >
                            {dang ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="rounded-2xl p-5 md:p-7 flex flex-col gap-4"
            style={{ background: "linear-gradient(135deg, #E3F3FF 0%, #CBE7FB 100%)" }}
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[20px] md:text-[23px] leading-snug text-[#1A1006]">
                Để lại số điện thoại để nhận gợi ý quà
              </h2>
              <p className="text-[14px] text-[#1A1006]/70">
                Đã chọn {NHOM.filter((n) => chon[n.key]).length}/{NHOM.length} mục — chưa chọn đủ vẫn gửi được.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tq-sdt" className="text-[13px] font-semibold text-[#1A1006]/80 mb-1.5 block">
                  Số điện thoại / Zalo <span style={{ color: "oklch(0.55 0.18 25)" }}>*</span>
                </label>
                <input
                  id="tq-sdt"
                  required
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  className="w-full border border-line rounded-[10px] px-3.5 py-3.5 bg-white text-[16px]"
                />
                {loiSdt && (
                  <p className="text-[13px] mt-1.5" style={{ color: "oklch(0.55 0.18 25)" }}>
                    Số điện thoại chưa đúng, bạn kiểm tra lại giúp mình nhé.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="tq-ten" className="text-[13px] font-semibold text-[#1A1006]/80 mb-1.5 block">
                  Tên của bạn <span className="font-normal">(không bắt buộc)</span>
                </label>
                <input
                  id="tq-ten"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full border border-line rounded-[10px] px-3.5 py-3.5 bg-white text-[16px]"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-[18px] h-[18px] flex-shrink-0 accent-[oklch(0.62_0.16_40)]"
              />
              <span className="text-[#1A1006]/75 text-[12.5px] leading-relaxed">
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
              className="bg-accent text-accent-ink rounded-xl px-8 py-4 text-[16px] font-semibold flex items-center justify-center gap-2 disabled:opacity-60 min-h-[48px]"
            >
              {status === "submitting" ? "Đang gửi..." : "Gửi nhu cầu — nhận tư vấn"}
              {status !== "submitting" && <ArrowRightIcon size={16} />}
            </button>
            {status === "error" && (
              <p className="text-sm text-center" style={{ color: "oklch(0.55 0.18 25)" }}>
                Có lỗi khi gửi yêu cầu, bạn thử lại giúp mình nhé.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
