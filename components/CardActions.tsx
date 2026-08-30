"use client";

import { useState } from "react";
import Link from "next/link";
import { ShareIcon, DownloadIcon, ArrowRightIcon } from "@/components/icons";

export default function CardActions({
  shareUrl,
  imageUrl,
  den,
  zaloOaUrl,
}: {
  shareUrl: string;
  imageUrl: string;
  den: string;
  zaloOaUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Thiệp Trung Thu từ Chọn Quà Chuẩn",
          text: `Gửi tới ${den} một lời chúc Trung Thu 🏮`,
          url: shareUrl,
        });
        return;
      } catch {
        // người dùng huỷ chia sẻ — không cần xử lý gì thêm
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard không khả dụng — bỏ qua, người dùng vẫn thấy link trong thanh địa chỉ
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-[440px] mx-auto">
      <button
        onClick={handleShare}
        className="bg-accent text-accent-ink rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2"
      >
        <ShareIcon size={18} />
        {copied ? "Đã copy link — gửi qua Zalo ngay" : "Gửi qua Zalo / chia sẻ"}
      </button>

      <a
        href={imageUrl}
        download="thiep-trung-thu-chonquachuan.png"
        className="border-[1.5px] border-line rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2"
      >
        <DownloadIcon size={18} />
        Tải ảnh thiệp
      </a>

      {zaloOaUrl && (
        <a
          href={zaloOaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[10px] py-4 text-[15px] font-semibold w-full flex items-center justify-center gap-2"
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
