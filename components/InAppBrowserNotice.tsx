"use client";

import { useEffect, useState } from "react";

// Facebook/Instagram mo link tu bai dang bang trinh duyet rieng nhung trong
// app cua ho — trinh duyet nay CHAN ca gui anh qua Zalo lan nhan giu luu anh
// (Meta co tinh gioi han de giu nguoi dung o lai app). Day la duong dan
// THAT SU pho bien nhat de den duoc trang nay (chia se bai + link tren
// Facebook), nen phai xu ly ngay khi vao trang, khong doi den luc bam gui
// moi bao loi.
function detectInAppBrowser(): { blocked: boolean; isAndroid: boolean } {
  if (typeof navigator === "undefined") return { blocked: false, isAndroid: false };
  const ua = navigator.userAgent || "";
  return {
    blocked: /FBAN|FBAV|FB_IAB|Instagram/i.test(ua),
    isAndroid: /Android/i.test(ua),
  };
}

export default function InAppBrowserNotice() {
  const [state, setState] = useState<{ blocked: boolean; isAndroid: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setState(detectInAppBrowser());
  }, []);

  if (!state?.blocked) return null;

  function openInRealBrowser() {
    const url = window.location.href;
    if (state?.isAndroid) {
      // Meo pho bien de "thoat" trinh duyet trong app tren Android: dung
      // intent:// de he thong mo thang bang Chrome that, bo qua webview
      // cua Facebook/Instagram. Khong co meo tuong duong dang tin cay tren
      // iOS (Apple khong cho phep) nen iOS chi con cach copy link.
      const withoutScheme = url.replace(/^https?:\/\//, "");
      window.location.href = `intent://${withoutScheme}#Intent;scheme=https;package=com.android.chrome;end`;
      return;
    }
    navigator.clipboard?.writeText(url).then(() => setCopied(true));
  }

  return (
    <div
      className="w-full max-w-[440px] mx-auto rounded-[14px] p-4 flex flex-col gap-2.5 text-center"
      style={{ background: "var(--sage-soft, #EAF3EC)", color: "oklch(0.35 0.08 150)" }}
    >
      <p className="text-[14px] font-semibold leading-relaxed">
        💌 Thiệp đã sẵn sàng rồi nè! Chỉ là bạn đang mở từ Facebook/Instagram nên máy chưa cho gửi thẳng qua Zalo được.
      </p>
      {state.isAndroid ? (
        <button
          type="button"
          onClick={openInRealBrowser}
          className="rounded-[10px] py-3 text-[14px] font-semibold"
          style={{ background: "var(--accent, #16A34A)", color: "#fff" }}
        >
          Mở bằng trình duyệt để gửi thiệp
        </button>
      ) : (
        <>
          <p className="text-[13px] leading-relaxed">
            Chạm vào <strong>⋯</strong> (hoặc biểu tượng chia sẻ) ở góc màn hình, chọn <strong>“Mở bằng Safari”</strong> — hoặc bấm nút bên dưới để sao chép link rồi dán vào Safari.
          </p>
          <button
            type="button"
            onClick={openInRealBrowser}
            className="rounded-[10px] py-3 text-[14px] font-semibold"
            style={{ background: "var(--accent, #16A34A)", color: "#fff" }}
          >
            {copied ? "Đã sao chép — mở Safari và dán vào" : "Sao chép link thiệp"}
          </button>
        </>
      )}
    </div>
  );
}
