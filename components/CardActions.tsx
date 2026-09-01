"use client";

import { useState } from "react";
import Link from "next/link";
import { ShareIcon, DownloadIcon, ArrowRightIcon } from "@/components/icons";
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

type Status = "idle" | "working" | "downloaded" | "shared" | "error";

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
  const fileName = buildFileName(tu);

  function reportError(prefix: string, err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    setErrorDetail(`${prefix}: ${msg}`);
    setStatus("error");
  }

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
    const shareText = `Gửi tới ${den} một lời chúc Trung Thu 🏮 — chonquachuan.vn`;

    // Uu tien gui thang tam ANH thay vi gui link — de nguoi nhan thay ngay
    // tam thiep, khong phai mot duong link dai xau.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Thiệp Trung Thu từ chonquachuan.vn",
            text: shareText,
          });
          setStatus("shared");
          return;
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setStatus("idle");
          return;
        }
        // canShare/share bao loi vi ly do khac (khong phai huy) - roi xuong tai anh ben duoi
      }
    }

    try {
      downloadBlob(blob, fileName);
      setStatus("downloaded");
    } catch (err) {
      reportError("Lỗi khi tải ảnh", err);
    }
  }

  async function handleDownload() {
    setStatus("working");
    setErrorDetail("");
    try {
      const blob = await captureCardAsBlob();
      downloadBlob(blob, fileName);
      setStatus("downloaded");
    } catch (err) {
      reportError("Lỗi khi tải ảnh", err);
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
        {status === "downloaded" && "Đã tải ảnh — gửi ảnh đó cho người nhận nhé"}
        {status === "error" && "Có lỗi, xem chi tiết bên dưới"}
        {status === "idle" && "Gửi ảnh thiệp qua Zalo"}
      </button>

      <button
        type="button"
        onClick={handleDownload}
        disabled={status === "working"}
        className="border-[1.5px] border-line rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-60"
      >
        <DownloadIcon size={18} />
        Tải ảnh thiệp
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
          Kết bạn Zalo OA — nhận ưu đãi Trung Thu &amp; Tết
        </a>
      )}

      <Link
        href="/thiep-trung-thu"
        className="text-center text-[14px] font-semibold mt-1 flex items-center justify-center gap-1.5"
      >
        Tự tạo thiệp cho người thân của bạn
        <ArrowRightIcon size={15} />
      </Link>
    </div>
  );
}
