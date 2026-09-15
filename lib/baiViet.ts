// Bài viết "Kiến thức chọn quà" — xu hướng, mẹo và kinh nghiệm chọn quà.
//
// - Mỗi bài có trang riêng ở href = "/bai-viet/<tiêu đề viết không dấu>"
//   (app/bai-viet/[slug]/page.tsx). Thêm bài mới = thêm 1 phần tử vào ĐẦU
//   mảng (bài mới nhất đứng đầu) + ảnh trong public/, không phải tạo trang.
//   Đã đưa link lên web thì ĐỪNG đổi href nữa, link khách đã lưu sẽ hỏng.
// - BAI_VIET[0] hiện ở ô lớn khu "Kiến thức chọn quà" trên trang chủ; các bài
//   sau hiện thành danh sách ngắn bên dưới ô đó.
// - Không đưa tên, logo hay dữ liệu khách doanh nghiệp của Nguyên Khánh Vina
//   vào bài (chị Nga đã chốt).
export type BaiViet = {
  id: string; // mã nội bộ — ghi vào bảng leads khi khách để lại thông tin từ bài
  href: string; // "/bai-viet/<tiêu đề không dấu>"
  chuyenMuc: string;
  title: string;
  tomTat: string; // dưới tiêu đề ở thẻ trang chủ + mô tả cho Google/khi chia sẻ link
  ngayDang: string; // YYYY-MM-DD
  anh: string;
  anhRong: number;
  anhCao: number;
  anhAlt: string;
  anhGhiChu?: string;
  moDau: string[];
  yChinhDanDat?: string; // câu dẫn trước danh sách ý chính
  yChinh: { tieuDe: string; noiDung: string }[];
  ketBai: string[];
  loiMoiTuVan: string; // câu trong khung mời tư vấn cuối bài
};

export const BAI_VIET: BaiViet[] = [
  {
    // Cùng nội dung bài Fanpage hẹn giờ 07:00 16/09/2026 — bản Word ở
    // D:\ChonQuaChuan\Anh Tai lieu dang bai\2026-09-15_BAIDANG_CQC_xu-huong-qua-tet-2027.docx
    id: "xu-huong-qua-tang-tet-2027",
    href: "/bai-viet/xu-huong-qua-tang-tet-2027",
    chuyenMuc: "Xu hướng quà Tết",
    title: "Xu hướng quà tặng Tết 2027: Sáng tạo để trao giá trị, chạm vào cảm xúc",
    tomTat:
      "Quà Tết 2027 không còn gói gọn trong những giỏ quà khuôn mẫu — sáng tạo gặp gỡ giá trị thiết thực, tạo nên trải nghiệm cảm xúc khác biệt.",
    ngayDang: "2026-09-15",
    anh: "/marketing/post-xu-huong-qua-tet-2027.jpg",
    anhRong: 1302,
    anhCao: 800,
    anhAlt: "Hộp quà Tết bằng gỗ khắc logo trên nắp, bộ ấm chén sứ, hũ hạt và khăn, bên cành mai vàng",
    anhGhiChu:
      "Hình ảnh ý tưởng — có thể sản xuất thành sản phẩm thật. Doanh nghiệp có thể khắc logo trên nắp hộp.",
    moDau: [
      "Tết 2027 này, một món quà Tết “chuẩn” không còn gói gọn trong những giỏ quà khuôn mẫu. Xu hướng năm nay gọi tên những giải pháp quà tặng đột phá — nơi sự sáng tạo gặp gỡ giá trị thiết thực để tạo nên những trải nghiệm cảm xúc khác biệt.",
    ],
    yChinhDanDat:
      "Tại Chọn Quà Chuẩn, chúng tôi đồng hành cùng doanh nghiệp của bạn đón đầu xu hướng với 3 lời cam kết:",
    yChinh: [
      {
        tieuDe: "Sáng tạo tạo cảm xúc",
        noiDung:
          "Nói không với những mẫu mã đại trà. Mỗi hộp quà Tết tại Chọn Quà Chuẩn đều được chăm chút tỉ mỉ từ chất liệu thân thiện, thiết kế độc bản đến chiếc thiệp gửi gắm tâm ý, mang lại sự bất ngờ và xúc động cho người nhận.",
      },
      {
        tieuDe: "Đậm chất cá nhân hóa",
        noiDung:
          "Chúng tôi cùng bạn thiết kế những set quà mang dấu ấn riêng của thương hiệu, từ việc in ấn logo tinh tế đến tùy chỉnh thành phần bên trong, giúp món quà Tết trở thành đại sứ truyền tải trọn vẹn giá trị của doanh nghiệp.",
      },
      {
        tieuDe: "Tiện lợi và an tâm tuyệt đối",
        noiDung:
          "Quy trình tư vấn giải pháp nhanh chóng, bàn giao mẫu thực tế chuẩn xác và dịch vụ giao hàng chỉn chu, đúng hẹn. Bạn chỉ cần lên ý tưởng, mọi khâu hoàn thiện đã có Chọn Quà Chuẩn lo.",
      },
    ],
    ketBai: [
      "Tết này, hãy để chúng tôi cùng bạn “Gặp nhau sáng tạo - Trao giá trị” qua những bộ quà tặng ý nghĩa nhất!",
    ],
    loiMoiTuVan:
      "Liên hệ ngay với Chọn Quà Chuẩn để nhận tư vấn giải pháp quà tặng Tết 2027 độc đáo cho doanh nghiệp của bạn!",
  },
];

// Phần cuối của href — là tham số [slug] của trang bài viết.
export const baiVietSlug = (bai: BaiViet) => bai.href.replace(/^\/bai-viet\//, "");

// "2026-09-15" → "15/09/2026"
export const ngayVN = (iso: string) => iso.split("-").reverse().join("/");
