"use client";

import { useState } from "react";
import Link from "next/link";
import { ShareIcon, DownloadIcon, ArrowRightIcon } from "@/components/icons";
import { ZALO_URL } from "@/lib/contact";

function buildFileName(tu: string) {
  const safeTu = tu.replace(/[\\/:*?"<>|]/g, "").trim() || "ban";
  return `Thiep tang - ${safeTu}.png`;
}

export default function CardActions({
  shareUrl,
  imageUrl,
  tu,
  den,
}: {
  shareUrl: string;
  imageUrl: string;
  tu: string;
  den: string;
}) {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "downloaded">("idle");
  const fileName = buildFileName(tu);

  async function handleShare() {
    const shareText = `Gửi tới ${den} một lời chúc Trung Thu 🏮 — chonquachuan.vn`;

    // Ưu tiên gửi thẳng tấm ẢNH (đã có sẵn chữ chonquachuan.vn trên ảnh) thay vì
    // gửi link — để người nhận thấy ngay tấm thiệp, không phải một đường link dài xấu.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], fileName, {
          type: blob.type || "image/png",
        });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "Thiệp Trung Thu từ chonquachuan.vn",
            text: shareText,
          });
          return;
        }
        await navigator.share({ title: "Thiệp Trung Thu từ chonquachuan.vn", text: shareText, url: shareUrl });
        return;
      } catch {
        // Hộp thoại chia sẻ của máy không có ứng dụng phù hợp (vd. máy tính không
        // cài Zalo) hoặc người dùng đóng hộp thoại — dù lý do gì, vẫn luôn đảm bảo
        // người dùng nhận được tấm ảnh bằng cách tải trực tiếp bên dưới, không để
        // màn hình im lặng như không có chuyện gì xảy ra.
      }
    }

    // Không chia sẻ được ảnh trực tiếp: tải thẳng ảnh về máy thay vì copy link dài.
    try {
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = fileName;
      a.click();
      setFeedback("downloaded");
      setTimeout(() => setFeedback("idle"), 3000);
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setFeedback("copied");
        setTimeout(() => setFeedback("idle"), 3000);
      } catch {
        // clipboard không khả dụng — bỏ qua, người dùng vẫn thấy link trong thanh địa chỉ
      }
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-[440px] mx-auto">
      <button
        onClick={handleShare}
        className="bg-accent text-accent-ink rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2 min-h-[44px]"
      >
        <ShareIcon size={18} />
        {feedback === "copied" && "Đã copy link — gửi qua Zalo ngay"}
        {feedback === "downloaded" && "Đã tải ảnh — gửi ảnh đó cho người nhận nhé"}
        {feedback === "idle" && "Gửi ảnh thiệp qua Zalo"}
      </button>

      <a
        href={imageUrl}
        download={fileName}
        className="border-[1.5px] border-line rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2 min-h-[44px]"
      >
        <DownloadIcon size={18} />
        Tải ảnh thiệp
      </a>

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
