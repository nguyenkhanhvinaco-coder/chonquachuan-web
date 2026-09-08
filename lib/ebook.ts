// Danh sách Ebook — hiện có 1 cuốn: "10 bài học kinh doanh từ Chung Ju Yung".
// Thêm ebook mới sau này chỉ cần thêm 1 phần tử vào mảng EBOOKS bên dưới
// (kèm ảnh bìa trong public/ebooks/covers/) — thẻ quảng bá trên trang chủ
// (EbookCoverCard.tsx) tự động chạy luân phiên qua hình bìa của tất cả các
// ebook trong mảng này, không cần sửa gì thêm ở trang chủ.
//
// Đọc trên web luôn miễn phí (nhúng file HTML tĩnh trong public/ebooks/).
// Tải file PDF về máy đi qua liên hệ thủ công: khách để lại email hoặc
// Zalo trong form ở trang /ebook (xem EbookLeadForm.tsx), nhân viên Chọn Quà
// Chuẩn gửi số tài khoản để khách chuyển khoản 5.000đ, rồi gửi file PDF
// cho khách — file đã có sẵn, xem hướng dẫn ở đầu EbookLeadForm.tsx.
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
];

export const EBOOK_PRICE_VND = 5000;

// Giữ 2 hằng số này để trang /ebook và EbookLeadForm dùng cho cuốn hiện tại.
export const EBOOK_READER_URL = EBOOKS[0].readerUrl;
export const EBOOK_PDF_URL = EBOOKS[0].pdfUrl;
export const EBOOK_PRODUCT_REF = `ebook-${EBOOKS[0].id}`;
