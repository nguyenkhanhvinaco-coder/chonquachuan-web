"use client";

import { useState } from "react";
import Link from "next/link";
import { ShareIcon, ArrowRightIcon, XIcon } from "@/components/icons";
import { ZALO_URL } from "@/lib/contact";

function buildFileName(tu: string) {
  const safeTu = tu.replace(/[\\/:*?"<>|]/g, "").trim() || "ban";
  return `Thiep tang - ${safeTu}.png`;
}

// Chup truc tiep tam thiep dang hien tren man hinh thanh anh PNG, ngay trong
// trinh duyet — khong goi ve server sinh anh nua (route server tung bi loi
// 500 do thu vien next/og gap loi khi nap font luc chay). Cach nay cho ra
// anh giong het nhung gi nguoi dung dang thay, luon dang tin cay.
async function captureCardAsBlob(): Promise<Blob> {
  const node = document.getElementById("thiep-capture-frame");
  if (!node) throw new Error("Không tìm thấy khung thiệp trong trang");
  const { toBlob } = await import("html-to-image");

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Quá 12 giây chưa tạo xong ảnh (có thể do mạng chậm hoặc trình duyệt chặn)")), 12_000)
  );
  const blob = await Promise.race([toBlob(node, { pixelRatio: 2 }), timeout]);
  if (!blob) throw new Error("html-to-image trả về rỗng (không tạo được ảnh)");
  return blob;
}

// Dung de chon loi huong dan/hanh vi luu anh phu hop cho tung loai thiet bi.
function isTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.maxTouchPoints > 0;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Không đọc được ảnh"));
    reader.readAsDataURL(blob);
  });
}

// Tren trinh duyet may tinh binh thuong, tai file bang the <a download> luon
// hoat dong tot — chi rieng trinh duyet trong app tren dien thoai (Zalo,
// Facebook...) moi lam ngo lenh nay ma khong bao loi.
function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

type Status = "idle" | "working" | "shared" | "downloaded" | "error";

export default function CardActions({
  shareUrl,
  tu,
  den,
}: {
  shareUrl: string;
  tu: string;
  den: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorDetail, setErrorDetail] = useState("");
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const fileName = buildFileName(tu);

  function reportError(prefix: string, err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    setErrorDetail(`${prefix}: ${msg}`);
    setStatus("error");
  }

  // Mot nut duy nhat: uu tien gui thang tam ANH qua Zalo (hoat dong tot tren
  // dien thoai/may tinh bang thuc su, vi Zalo mobile co dang ky nhan chia
  // se). Tren may tinh, Zalo desktop KHONG dang ky nhan chia se qua trinh
  // duyet (gioi han cua Windows/Zalo, khong sua duoc tu phia web) - neu
  // khong gui truc tiep duoc, tu dong tai anh ve may de nguoi dung tu dinh
  // kem gui qua Zalo.
  async function handleShare() {
    setStatus("working");
    setErrorDetail("");
    let blob: Blob;
    try {
      blob = await captureCardAsBlob();
    } catch (err) {
      reportError("Lỗi khi chụp ảnh thiệp", err);
      return;
    }

    const file = new File([blob], fileName, { type: blob.type || "image/png" });
    const shareText = `Gửi tới ${den} một lời chúc 🎁 — chonquachuan.vn`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Thiệp tranh vẽ từ chonquachuan.vn",
            text: shareText,
          });
          setStatus("shared");
          return;
        }
        // May khong ho tro chia se FILE nhung van co the ho tro chia se
        // link+chu thuong - thu buoc nay truoc khi danh phai hien anh de
        // tu luu (day chinh la buoc bi bo sot lan gop nut truoc, khien
        // trinh duyet trong app Zalo roi thang xuong man hinh luu anh).
        await navigator.share({
          title: "Thiệp tranh vẽ từ chonquachuan.vn",
          text: shareText,
          url: shareUrl,
        });
        setStatus("shared");
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setStatus("idle");
          return;
        }
        // canShare/share bao loi vi ly do khac (khong phai huy) - roi xuong luu anh ben duoi
      }
    }

    if (!isTouchDevice()) {
      try {
        downloadBlob(blob, fileName);
        setStatus("downloaded");
      } catch (err) {
        reportError("Lỗi khi tải ảnh", err);
      }
      return;
    }

    // Dien thoai/may tinh bang khong chia se truc tiep duoc: hien anh de
    // nguoi dung tu nhan giu > luu anh - vi trinh duyet trong app (Zalo,
    // Facebook...) hay lam ngo lenh tai file ma khong bao loi.
    try {
      const dataUrl = await blobToDataUrl(blob);
      setSavedImageUrl(dataUrl);
      setStatus("idle");
    } catch (err) {
      reportError("Lỗi khi tạo ảnh để lưu", err);
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-[440px] mx-auto">
      <button
        onClick={handleShare}
        disabled={status === "working"}
        className="bg-accent text-accent-ink rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-60"
      >
        <ShareIcon size={18} />
        {status === "working" && "Đang tạo ảnh..."}
        {status === "shared" && "Đã mở hộp thoại chia sẻ"}
        {status === "downloaded" && "Đã tải ảnh — gửi ảnh đó qua Zalo nhé"}
        {status === "error" && "Có lỗi, xem chi tiết bên dưới"}
        {status === "idle" && "Gửi ảnh thiệp qua Zalo"}
      </button>

      {status === "error" && errorDetail && (
        <p className="text-[12px] text-center break-words" style={{ color: "#B3261E" }}>
          {errorDetail}
        </p>
      )}

      {/* Nút Zalo OA đang tạm ẩn — chờ NEXT_PUBLIC_ZALO_OA_URL. Nhắn Zalo tạm thời
          đi qua nút "Gửi qua Zalo / chia sẻ" ở trên (chia sẻ link, không phải chat OA). */}
      {process.env.NEXT_PUBLIC_ZALO_OA_URL && (
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2 min-h-[44px]"
          style={{ background: "var(--sage-soft)", color: "oklch(0.4 0.1 150)" }}
        >
          Kết bạn Zalo OA — nhận ưu đãi dành riêng cho bạn
        </a>
      )}

      <Link
        href="/thiep-mien-phi"
        className="text-center text-[14px] font-semibold mt-1 flex items-center justify-center gap-1.5"
      >
        Tự tạo thiệp cho người thân của bạn
        <ArrowRightIcon size={15} />
      </Link>

      {savedImageUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-6"
          style={{ background: "rgba(20,15,10,0.9)" }}
        >
          <button
            type="button"
            onClick={() => setSavedImageUrl(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Đóng"
          >
            <XIcon size={20} color="#FFFFFF" />
          </button>
          <p className="text-white text-center text-[15px] font-semibold max-w-[320px] leading-relaxed">
            Nhấn giữ vào ảnh bên dưới rồi chọn &ldquo;Lưu ảnh&rdquo; để lưu về máy — sau đó gửi ảnh đó cho người nhận qua Zalo.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={savedImageUrl}
            alt={fileName}
            className="max-w-full max-h-[65vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
