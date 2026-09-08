"use client";

import { useState } from "react";
import {
  EBOOK_PDF_URL,
  EBOOK_PRICE_VND,
  buildVietQrImageUrl,
  generateOrderCode,
  isEbookPaymentConfigured,
} from "@/lib/ebook";

export default function EbookDownloadCard() {
  const [orderCode] = useState(generateOrderCode);
  const [unlocked, setUnlocked] = useState(false);
  const configured = isEbookPaymentConfigured();

  if (!configured) {
    return (
      <div className="rounded-xl border border-line bg-surface-2 px-6 py-5 flex flex-col gap-1.5">
        <span className="font-serif text-lg">Bản PDF tải về</span>
        <p className="text-ink-soft text-sm">
          Đang chuẩn bị — theo dõi Fanpage Chọn Quà Chuẩn để biết ngay khi có.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface-2 px-6 py-6 flex flex-col gap-4 max-w-[420px]">
      <div className="flex flex-col gap-1.5">
        <span className="font-serif text-lg">Tải bản PDF về máy</span>
        <p className="text-ink-soft text-sm leading-relaxed">
          Đọc trên web hoàn toàn miễn phí. Muốn lưu file PDF về máy, góp{" "}
          <b className="text-ink">{EBOOK_PRICE_VND.toLocaleString("vi-VN")}đ</b> vào Quỹ xã hội của
          Chọn Quà Chuẩn.
        </p>
      </div>

      {!unlocked ? (
        <>
          <div className="flex items-center gap-4">
            <img
              src={buildVietQrImageUrl(orderCode)}
              alt="Mã QR chuyển khoản 5.000đ"
              width={132}
              height={132}
              className="rounded-lg border border-line bg-white p-1.5 flex-shrink-0"
            />
            <div className="text-[13px] text-ink-soft flex flex-col gap-1">
              <span>Quét mã, chuyển đúng số tiền.</span>
              <span>
                Nội dung: <b className="text-ink font-mono">EBOOK {orderCode}</b>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="bg-accent text-accent-ink rounded-lg px-5 py-3 text-sm font-semibold min-h-[44px]"
          >
            Tôi đã chuyển khoản — Tải PDF
          </button>
          <p className="text-ink-soft text-[12px]">
            Chọn Quà Chuẩn dùng cơ chế tự giác — cảm ơn bạn đã ủng hộ đúng số tiền.
          </p>
        </>
      ) : (
        <a
          href={EBOOK_PDF_URL}
          download
          className="bg-accent text-accent-ink rounded-lg px-5 py-3 text-sm font-semibold min-h-[44px] flex items-center justify-center"
        >
          Tải xuống file PDF
        </a>
      )}
    </div>
  );
}
