// Cấu hình cho trang Ebook — hiện có 1 cuốn: "10 bài học kinh doanh từ Chung Ju Yung".
//
// Đọc trên web luôn miễn phí. Tải file PDF về máy là tuỳ chọn có phí nhỏ
// (5.000đ), trích vào Quỹ xã hội của Chọn Quà Chuẩn — thu qua chuyển khoản
// VietQR, xác nhận theo cơ chế tự giác (khách bấm "Tôi đã chuyển khoản" là
// mở khoá tải ngay, không cần cổng thanh toán).
//
// Số tài khoản nhận tiền đọc từ biến môi trường NEXT_PUBLIC_EBOOK_BANK_*
// (đặt trong .env.local, không commit). Chưa đặt thì nút tải PDF tự ẩn/khoá
// để không hiển thị một luồng thu tiền chưa hoạt động.
export const EBOOK_BANK_CODE = process.env.NEXT_PUBLIC_EBOOK_BANK_CODE || "";
export const EBOOK_BANK_ACCOUNT = process.env.NEXT_PUBLIC_EBOOK_BANK_ACCOUNT || "";
export const EBOOK_BANK_ACCOUNT_NAME = process.env.NEXT_PUBLIC_EBOOK_BANK_ACCOUNT_NAME || "";

export const EBOOK_PRICE_VND = 5000;
export const EBOOK_READER_URL = "/ebooks/chung-ju-yung-10-bai-hoc.html";
export const EBOOK_PDF_URL = "/ebooks/10-bai-hoc-chung-ju-yung.pdf";

export function isEbookPaymentConfigured(): boolean {
  return Boolean(EBOOK_BANK_CODE && EBOOK_BANK_ACCOUNT);
}

// Ảnh QR VietQR sinh động (dịch vụ công khai img.vietqr.io, không cần đăng
// ký) — mã hoá sẵn số tiền + nội dung chuyển khoản riêng cho từng lượt tải.
export function buildVietQrImageUrl(orderCode: string): string {
  const info = encodeURIComponent(`EBOOK ${orderCode}`);
  const name = encodeURIComponent(EBOOK_BANK_ACCOUNT_NAME);
  return `https://img.vietqr.io/image/${EBOOK_BANK_CODE}-${EBOOK_BANK_ACCOUNT}-compact2.png?amount=${EBOOK_PRICE_VND}&addInfo=${info}&accountName=${name}`;
}

export function generateOrderCode(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${stamp}${rand}`;
}
