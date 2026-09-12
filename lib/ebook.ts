// Danh sách Ebook — tủ sách miễn phí của Chọn Quà Chuẩn.
//
// - EBOOKS[0] là cuốn NỔI BẬT: chiếm trang /ebook, ô "Sản phẩm nổi bật" ở
//   trang chủ, và là bìa đầu tiên của thẻ quay vòng (EbookCoverCard.tsx).
//   Muốn đổi cuốn nổi bật: đưa cuốn mới lên ĐẦU mảng với href "/ebook", cuốn
//   bị thay thì đổi href về "/ebook/<id>".
// - Mọi cuốn còn lại có trang riêng /ebook/<id> (app/ebook/[slug]/page.tsx) —
//   thêm cuốn mới chỉ cần thêm 1 phần tử vào mảng (kèm ảnh bìa 3:4 trong
//   public/ebooks/covers/), không phải tạo trang mới.
// - Khi đang đọc một cuốn, các cuốn khác hiện trong EbookMoreList: cột bên
//   cạnh khung đọc trên màn hình rộng (xl, từ 1280px), ô xổ ra phía trên khung
//   đọc trên màn hình nhỏ hơn.
//
// Đọc trên web luôn miễn phí (nhúng file HTML tĩnh trong public/ebooks/).
// Nhận file PDF: MIỄN PHÍ cho mọi cuốn (bỏ thu 5.000đ từ 2026-09-11), nhưng
// không có nút tải trực tiếp — khách để lại email hoặc Zalo trong form
// (EbookLeadForm.tsx), nhân viên Chọn Quà Chuẩn gửi file qua đúng kênh đó.
// File PDF đã có sẵn ở pdfUrl — cách gửi nhanh nhất là dán link
// https://chonquachuan.vn + pdfUrl cho khách.
export type Ebook = {
  id: string; // cũng là đường dẫn /ebook/<id> khi không phải cuốn nổi bật
  title: string;
  subtitle: string; // dòng phụ trên thẻ bìa ở trang chủ
  series: string; // nhãn nhỏ phía trên tiêu đề ở trang đọc
  intro: string; // đoạn giới thiệu ở trang đọc
  sourceNote?: string; // ghi nguồn khi nội dung diễn giải từ sách/bài giảng của người khác
  description: string; // mô tả cho Google và khi chia sẻ link
  cover: string;
  readerUrl: string;
  pdfUrl: string;
  href: string;
};

export const EBOOKS: Ebook[] = [
  {
    // Cuốn nổi bật từ 2026-09-13 — thay chỗ cuốn Chung Ju Yung.
    id: "cuoc-doi-khong-den-de-ta-sua",
    title: "Cuộc đời không đến để ta sửa — mà để ta được sửa",
    subtitle: "Pháp thoại Thầy Viên Minh — lật từng trang, đọc ngay",
    series: "Tủ sách an lạc",
    intro:
      "Chín bài học ngắn về nghịch cảnh, chánh niệm và sự hoàn hảo vốn sẵn — mỗi bài đứng độc lập, đọc một đoạn là mang được vào ngày của mình. Lật từng trang ngay bên dưới, hoàn toàn miễn phí.",
    sourceNote:
      "Nội dung đúc kết và diễn giải lại bằng lời riêng từ buổi pháp thoại vấn đáp của Thầy Viên Minh — không phải bản ghi nguyên văn. Mời bạn tìm nghe bài giảng gốc.",
    description:
      "Đọc miễn phí ebook đúc kết buổi pháp thoại vấn đáp của Thầy Viên Minh: chín bài học về nghịch cảnh, chánh niệm và sự hoàn hảo vốn sẵn — thực hiện bởi Chọn Quà Chuẩn.",
    cover: "/ebooks/covers/cuoc-doi-khong-den-de-ta-sua.png",
    readerUrl: "/ebooks/cuoc-doi-khong-den-de-ta-sua.html",
    pdfUrl: "/ebooks/cuoc-doi-khong-den-de-ta-sua.pdf",
    href: "/ebook",
  },
  {
    // Từng là cuốn nổi bật ở /ebook (2026-09-08 → 09-13).
    id: "chung-ju-yung",
    title: "10 bài học kinh doanh từ Chung Ju Yung",
    subtitle: "Người sáng lập Hyundai — lật từng trang, đọc ngay",
    series: "Tủ sách doanh nhân",
    intro:
      "Người sáng lập Hyundai — từ cậu bé nông dân bỏ nhà bốn lần với vài đồng bạc trong túi, đến người dựng nên một trong những tập đoàn công nghiệp lớn nhất châu Á. Lật từng trang ngay bên dưới, hoàn toàn miễn phí.",
    description:
      "Đọc miễn phí ebook 10 bài học kinh doanh từ Chung Ju Yung, người sáng lập Hyundai — thực hiện bởi Chọn Quà Chuẩn.",
    cover: "/ebooks/covers/chung-ju-yung.png",
    readerUrl: "/ebooks/chung-ju-yung-10-bai-hoc.html",
    pdfUrl: "/ebooks/10-bai-hoc-chung-ju-yung.pdf",
    href: "/ebook/chung-ju-yung",
  },
  {
    id: "khong-diet-khong-sinh",
    title: "Không diệt, không sinh — đừng sợ hãi",
    subtitle: "Tuệ giác Thích Nhất Hạnh — lật từng trang, đọc ngay",
    series: "Tủ sách an lạc",
    intro:
      "Bốn hình ảnh để hiểu nỗi sợ, hai bài thực tập để sống an hơn, và một lời nhắc rằng hạnh phúc có địa chỉ ngay đây, bây giờ. Lật từng trang ngay bên dưới, hoàn toàn miễn phí.",
    sourceNote:
      "Nội dung diễn giải từ sách Không diệt không sinh đừng sợ hãi của Thiền sư Thích Nhất Hạnh — không phải trích nguyên văn. Mời bạn tìm đọc sách gốc.",
    description:
      "Đọc miễn phí ebook đúc kết tuệ giác của Thiền sư Thích Nhất Hạnh về nỗi sợ, sự tiếp nối và hạnh phúc trong hiện tại — thực hiện bởi Chọn Quà Chuẩn.",
    cover: "/ebooks/covers/khong-diet-khong-sinh.png",
    readerUrl: "/ebooks/khong-diet-khong-sinh.html",
    pdfUrl: "/ebooks/khong-diet-khong-sinh-dung-so-hai.pdf",
    href: "/ebook/khong-diet-khong-sinh",
  },
];

// Mã sản phẩm ghi vào bảng leads khi khách xin file PDF — giữ đúng dạng cũ
// "ebook-<id>" để lead cũ và lead mới cùng một kiểu trong Sheet.
export const ebookProductRef = (id: string) => `ebook-${id}`;

// Cuốn nổi bật đang ở trang /ebook.
export const EBOOK_READER_URL = EBOOKS[0].readerUrl;
export const EBOOK_PDF_URL = EBOOKS[0].pdfUrl;
