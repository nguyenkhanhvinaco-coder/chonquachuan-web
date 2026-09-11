// Danh sách Ebook — hiện có 2 cuốn: "10 bài học kinh doanh từ Chung Ju Yung"
// (trang /ebook) và "Không diệt, không sinh — đừng sợ hãi" (trang riêng
// /ebook/khong-diet-khong-sinh).
// Thêm ebook mới sau này chỉ cần thêm 1 phần tử vào mảng EBOOKS bên dưới
// (kèm ảnh bìa trong public/ebooks/covers/) — thẻ quảng bá trên trang chủ
// (EbookCoverCard.tsx) tự động chạy luân phiên qua hình bìa của tất cả các
// ebook trong mảng này, không cần sửa gì thêm ở trang chủ. Lưu ý: trang chủ
// lấy EBOOKS[0] cho ô "Sản phẩm nổi bật" — thêm cuốn mới vào CUỐI mảng.
//
// Đọc trên web luôn miễn phí (nhúng file HTML tĩnh trong public/ebooks/).
// Nhận file PDF: MIỄN PHÍ cho mọi cuốn (bỏ thu 5.000đ từ 2026-09-11), nhưng
// không có nút tải trực tiếp — khách để lại email hoặc Zalo trong form
// (EbookLeadForm.tsx), nhân viên Chọn Quà Chuẩn gửi file qua đúng kênh đó.
// File PDF đã có sẵn ở pdfUrl — cách gửi nhanh nhất là dán link
// https://chonquachuan.vn + pdfUrl cho khách.
export type Ebook = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  readerUrl: string;
  pdfUrl: string;
  href: string;
};

export const EBOOKS: Ebook[] = [
  {
    id: "chung-ju-yung",
    title: "10 bài học kinh doanh từ Chung Ju Yung",
    subtitle: "Người sáng lập Hyundai — lật từng trang, đọc ngay",
    cover: "/ebooks/covers/chung-ju-yung.png",
    readerUrl: "/ebooks/chung-ju-yung-10-bai-hoc.html",
    pdfUrl: "/ebooks/10-bai-hoc-chung-ju-yung.pdf",
    href: "/ebook",
  },
  {
    // Nội dung diễn giải từ sách của Thiền sư Thích Nhất Hạnh — trong sách đã
    // ghi nguồn rõ ràng.
    id: "khong-diet-khong-sinh",
    title: "Không diệt, không sinh — đừng sợ hãi",
    subtitle: "Tuệ giác Thích Nhất Hạnh — lật từng trang, đọc ngay",
    cover: "/ebooks/covers/khong-diet-khong-sinh.png",
    readerUrl: "/ebooks/khong-diet-khong-sinh.html",
    pdfUrl: "/ebooks/khong-diet-khong-sinh-dung-so-hai.pdf",
    href: "/ebook/khong-diet-khong-sinh",
  },
];

// Mã sản phẩm ghi vào bảng leads khi khách xin file PDF — giữ đúng dạng cũ
// "ebook-<id>" để lead cũ và lead mới cùng một kiểu trong Sheet.
export const ebookProductRef = (id: string) => `ebook-${id}`;

// Giữ để trang /ebook (cuốn Chung Ju Yung) dùng.
export const EBOOK_READER_URL = EBOOKS[0].readerUrl;
export const EBOOK_PDF_URL = EBOOKS[0].pdfUrl;
