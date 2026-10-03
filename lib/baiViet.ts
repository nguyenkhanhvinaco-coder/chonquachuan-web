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
  // --- Tuỳ chọn, cho bài dạng so sánh / hỏi đáp (bài cũ không cần khai) ---
  soSanh?: { tieuDe: string; cot: string[]; dong: string[][] }; // bảng: cot[0] là cột tiêu chí
  lienKet?: { nhan: string; moTa: string; href: string }[]; // nút dẫn sang catalogue / trang khác
  hoiDap?: { hoi: string; dap: string }[]; // câu hỏi thường gặp — cũng xuất ra FAQPage JSON-LD
  // --- SEO (tuỳ chọn): Google cắt tiêu đề ~60 ký tự, mô tả ~155 ký tự ---
  tieuDeSeo?: string; // tiêu đề ngắn cho thẻ <title>; không khai thì dùng title
  moTaSeo?: string; // mô tả ngắn cho Google; không khai thì dùng tomTat
  ngayCapNhat?: string; // YYYY-MM-DD — lần sửa nội dung gần nhất
};

export const BAI_VIET: BaiViet[] = [
  {
    // Bài 20/10 (đăng 03/10/2026 — chị Nga nhắc 20/10 đến trước Tết, cần lên sớm).
    // Chỉ dùng giá đã công khai: bình nhập từ 65.000 đ, Lock&Lock từ 250.000 đ (gồm VAT + in logo,
    // giao 5 – 10 ngày). Cốc gốm hoa sen chưa có giá công khai → không ghi giá. Thiệp tranh miễn phí
    // là trang /thiep-mien-phi có thật. Lịch đặt hàng là GỢI Ý.
    // Sau 20/10 nên đưa bài này xuống dưới bài Tết (đổi thứ tự trong mảng).
    id: "qua-20-10-2026",
    href: "/bai-viet/qua-tang-20-10-cho-nhan-vien-nu-va-khach-hang",
    chuyenMuc: "Quà tặng doanh nghiệp",
    // Từ khóa lấy từ gợi ý tìm kiếm Google 03/10/2026 (D:\ChonQuaChuan\SEO\tu-khoa-20-10.txt):
    // quà 20/10 cho nhân viên nữ · quà tặng 20/10 cho khách hàng nữ · quà 20/10 công ty / doanh nghiệp
    // · set quà 20/10 cho doanh nghiệp · quà 20/10 cho đồng nghiệp nữ · quà 20/10 cho sếp nữ
    // · quà 20/10 dưới 100k / dưới 200k · quà 20/10 rẻ mà ý nghĩa.
    title: "Quà 20/10 cho nhân viên nữ và khách hàng nữ: gợi ý theo ngân sách, đặt kịp trước ngày lễ",
    tomTat:
      "Gợi ý quà tặng 20/10/2026 cho nhân viên nữ, đồng nghiệp nữ, sếp nữ và khách hàng nữ theo ngân sách từ dưới 100.000 đ, kèm set quà cho doanh nghiệp và lịch đặt hàng để kịp in logo trước thứ Ba 20/10.",
    tieuDeSeo: "Quà 20/10 cho nhân viên nữ, khách hàng nữ theo ngân sách",
    moTaSeo:
      "Quà 20/10 cho nhân viên nữ, khách hàng nữ: bình giữ nhiệt in logo từ 65.000 đ, Lock&Lock từ 250.000 đ, set quà doanh nghiệp, thiệp miễn phí.",
    ngayDang: "2026-10-03",
    anh: "/marketing/qua-20-10-2026.jpg",
    anhRong: 1200,
    anhCao: 750,
    anhAlt: "Cặp cốc gốm sứ xanh bạc hà và trắng kem vẽ hoa sen đặt trên lá sen, bên cạnh bức tranh bình hoa đỏ vẽ tay",
    anhGhiChu: "Cốc gốm sứ hoa sen vẽ tay và một mẫu thiệp tranh vẽ — hai gợi ý quà 20/10 nhẹ nhàng cho phái nữ.",
    moDau: [
      "Ngày Phụ nữ Việt Nam 20/10/2026 rơi vào thứ Ba. Quà có in logo cần khoảng 5 – 10 ngày sản xuất sau khi duyệt mẫu, nên doanh nghiệp muốn trao quà đúng ngày cần chốt mẫu trước ngày 10/10.",
      "Bài này gợi ý quà 20/10 theo ngân sách cho nhân viên nữ, đồng nghiệp và khách hàng, cùng bốn điều giúp món quà được dùng lâu chứ không chỉ đẹp trong một ngày.",
    ],
    soSanh: {
      tieuDe: "Gợi ý quà 20/10 cho công ty theo ngân sách",
      cot: ["Ngân sách / người", "Gợi ý quà", "Phù hợp với"],
      dong: [
        [
          "Từ 65.000 đ (quà giá rẻ mà ý nghĩa)",
          "Bình hoặc ly giữ nhiệt nhập khẩu màu nhẹ (hồng, xanh mint, trắng), giá bình từ 65.000 đ/cái chưa VAT; phí in logo báo riêng theo thiết kế",
          "Nhân viên nữ, công nhân viên, đồng nghiệp nữ, quà số lượng lớn",
        ],
        [
          "Từ 250.000 đ",
          "Bình Lock&Lock in hoặc khắc logo, từ 250.000 đ/cái (đã gồm VAT và in logo); hoặc cốc gốm sứ hoa sen vẽ tay, báo giá theo số lượng",
          "Khách hàng nữ, sếp nữ, quản lý, đối tác",
        ],
        [
          "Set quà cho doanh nghiệp",
          "Bình giữ nhiệt in logo kèm cốc gốm hoa sen và thiệp lời chúc, báo giá theo số lượng",
          "Khách hàng nữ thân thiết, đối tác quan trọng",
        ],
        [
          "Tặng kèm mọi mức",
          "Thiệp tranh vẽ có lời chúc riêng, tạo miễn phí trên chonquachuan.vn",
          "Mọi người nhận, nhất là khi muốn gửi lời cảm ơn riêng",
        ],
      ],
    },
    yChinhDanDat: "Bốn điều giúp quà 20/10 được nhớ lâu:",
    yChinh: [
      {
        tieuDe: "Chọn món dùng hằng ngày, đi kèm một bông hoa",
        noiDung:
          "Hoa đẹp nhưng héo sau vài ngày. Một món dùng hằng ngày như bình giữ nhiệt hay cốc gốm ở lại trên bàn làm việc cả năm. Nếu muốn có hoa, hãy để hoa đi kèm món quà chứ không thay cho món quà.",
      },
      {
        tieuDe: "Chọn màu nhẹ, logo nhỏ và tinh tế",
        noiDung:
          "Màu pastel và họa tiết hoa hợp với dịp 20/10. Logo doanh nghiệp nên in nhỏ, ở vị trí kín đáo, để người nhận vui vẻ dùng cả ngoài giờ làm chứ không chỉ ở văn phòng.",
      },
      {
        tieuDe: "Kèm một lời chúc viết riêng cho từng người",
        noiDung:
          "Một tấm thiệp gọi đúng tên và nhắc một điều cụ thể bạn trân trọng ở người nhận có giá trị hơn nhiều lời chúc chung. Thiệp tranh vẽ trên Chọn Quà Chuẩn tạo được miễn phí, ghi tên người nhận và lời chúc riêng, gửi qua Zalo kèm món quà.",
      },
      {
        tieuDe: "Đặt hàng ngược từ thứ Ba 20/10",
        noiDung:
          "Trước 8/10: chốt danh sách người nhận và ngân sách. Trước 10/10: chọn mẫu, duyệt logo và đặt sản xuất. Ngày 17 – 19/10: nhận hàng, gói quà, viết thiệp. Thứ Ba 20/10: trao quà.",
      },
    ],
    lienKet: [
      {
        nhan: "Xem catalogue bình giữ nhiệt",
        moTa: "39 mẫu bình và ly giữ nhiệt nhập khẩu, giá từ 65.000 đ",
        href: "/catalogue-binh-giu-nhiet",
      },
      {
        nhan: "Xem cốc gốm sứ hoa sen",
        moTa: "Vẽ tay, men mờ xanh bạc hà và trắng kem, nhận in logo",
        href: "/san-pham/coc-gom-hoa-sen",
      },
      {
        nhan: "Tạo thiệp tranh miễn phí",
        moTa: "Thiệp tranh vẽ có lời chúc riêng, gửi kèm quà 20/10",
        href: "/thiep-mien-phi",
      },
    ],
    hoiDap: [
      {
        hoi: "Ngày 20/10/2026 là thứ mấy?",
        dap: "Ngày Phụ nữ Việt Nam 20/10/2026 rơi vào thứ Ba.",
      },
      {
        hoi: "Đặt quà 20/10 in logo trước bao lâu?",
        dap: "Bình Lock&Lock in logo giao trong 5 – 10 ngày, nên chốt mẫu và đặt trước ngày 10/10. Bình nhập khẩu có sẵn hàng; đơn in logo giao theo lịch thống nhất sau khi duyệt mẫu, nên liên hệ càng sớm càng tốt.",
      },
      {
        hoi: "Quà 20/10 cho nhân viên nữ nên chọn mức giá nào?",
        dap: "Với số lượng lớn, mức dưới 150.000 đ/người như bình giữ nhiệt nhập khẩu in logo là phổ biến. Với khách hàng hoặc đối tác nữ, bình Lock&Lock từ 250.000 đ/cái đã gồm in logo thể hiện sự chỉn chu hơn.",
      },
      {
        hoi: "Đặt quà 20/10 in logo tối thiểu bao nhiêu cái?",
        dap: "Với bình giữ nhiệt, giá tốt nhất áp dụng từ 100 cái. Bình nhập khẩu vẫn nhận đơn nhỏ hơn: đơn 50 – 100 cái cộng thêm 5.000 đ/cái, dưới 50 cái cộng thêm 10.000 đ/cái.",
      },
      {
        hoi: "Có quà 20/10 dưới 100.000 đ cho nhân viên nữ không?",
        dap: "Có. Bình và ly giữ nhiệt nhập khẩu có giá từ 65.000 đ/cái (chưa VAT). Phí in logo được báo riêng theo thiết kế và số lượng, nên tổng giá mỗi phần quà có thể dưới hoặc trên 100.000 đ. Gửi logo và số lượng để nhận báo giá chính xác.",
      },
      {
        hoi: "Nên tặng gì 20/10 cho đồng nghiệp nữ và sếp nữ?",
        dap: "Với đồng nghiệp nữ, một bình giữ nhiệt màu nhẹ kèm thiệp lời chúc riêng là món quà dùng được hằng ngày. Với sếp nữ, nên chọn món có thương hiệu hoặc làm thủ công như bình Lock&Lock khắc logo hay cốc gốm sứ hoa sen vẽ tay.",
      },
      {
        hoi: "Set quà 20/10 cho doanh nghiệp thường gồm những gì?",
        dap: "Một set quà 20/10 cho doanh nghiệp thường gồm một món dùng hằng ngày in logo (bình giữ nhiệt, cốc), một món nhỏ đi kèm và thiệp lời chúc, đặt trong hộp quà. Chọn Quà Chuẩn báo giá set theo số lượng và ngân sách của từng doanh nghiệp.",
      },
      {
        hoi: "Có xuất hóa đơn VAT cho quà 20/10 không?",
        dap: "Có. Đơn hàng được xuất hóa đơn VAT bởi Công ty TNHH Nguyên Khánh Vina, đơn vị vận hành thương hiệu Chọn Quà Chuẩn.",
      },
    ],
    ketBai: [
      "Tóm lại: chọn món dùng được hằng ngày, màu nhẹ, logo nhỏ, kèm lời chúc viết riêng, và chốt mẫu trước ngày 10/10 để kịp trao quà đúng thứ Ba 20/10.",
      "Chọn Quà Chuẩn là thương hiệu quà tặng của Công ty TNHH Nguyên Khánh Vina tại TP. Hồ Chí Minh, nhận tư vấn và in, khắc logo quà tặng theo yêu cầu riêng của từng doanh nghiệp.",
    ],
    loiMoiTuVan:
      "Gửi số người nhận và ngân sách cho dịp 20/10, Chọn Quà Chuẩn sẽ gợi ý mẫu phù hợp và dựng thử logo để bạn duyệt trước khi đặt.",
  },
  {
    // Bài SEO mùa quà Tết (đăng 03/10/2026, doanh nghiệp bắt đầu tìm quà Tết từ tháng 10).
    // Chỉ dùng giá đã công khai trên web: bình nhập từ 65.000 đ, Lock&Lock từ 250.000 đ,
    // túi thêu tên 250.000 – 350.000 đ. Cốc gốm hoa sen chưa có giá công khai → không ghi giá.
    // Lịch đặt hàng là GỢI Ý, không phải cam kết thời gian giao.
    // 03/10/2026 chị Nga bảo lồng thêm quà vào bài: lấy hạng mục + NGÂN SÁCH THAM KHẢO từ bảng đề xuất
    // quà 2027 của NKV (file trong 01_KhachHang — KHÔNG ghi tên khách, chỉ dùng phần NKV đề xuất).
    // Giá các món này là khoảng tham khảo, chốt theo số lượng và mẫu.
    id: "qua-tet-doanh-nghiep-2027",
    href: "/bai-viet/qua-tet-doanh-nghiep-2027-chon-theo-ngan-sach",
    chuyenMuc: "Quà tặng doanh nghiệp",
    title: "Quà Tết doanh nghiệp 2027: chọn theo ngân sách và người nhận",
    tomTat:
      "Gợi ý quà Tết 2027 cho nhân viên, khách hàng và đối tác theo bốn mức ngân sách, từ bình giữ nhiệt in logo đến set quà Tết cao cấp có ấm chén sứ, kèm lịch đặt hàng để kịp trước Tết Đinh Mùi (6/2/2027).",
    tieuDeSeo: "Quà Tết doanh nghiệp 2027: chọn theo ngân sách",
    moTaSeo:
      "Quà Tết doanh nghiệp 2027: bình giữ nhiệt in logo từ 65.000 đ, đồ da khắc logo, set quà Tết cao cấp có ấm chén sứ in logo. Kèm lịch đặt hàng.",
    ngayDang: "2026-10-03",
    // Ảnh đồ họa Tết riêng (03/10/2026) — chị Nga nhắc không dùng lại ảnh bình của bài bên cạnh.
    anh: "/marketing/qua-tet-doanh-nghiep-2027-v3.jpg",
    anhRong: 1200,
    anhCao: 750,
    anhAlt: "Nhành mai vàng trên nền đỏ, chữ Quà Tết 2027 và ba mức ngân sách: dưới 150K, 150K – 1,5 triệu, set VIP 0,8 – 2 triệu",
    anhGhiChu: "Các mức ngân sách quà Tết 2027 cho nhân viên, khách hàng và đối tác.",
    moDau: [
      "Tết Đinh Mùi 2027 rơi vào thứ Bảy, ngày 6/2/2027. Quà có in logo cần thêm thời gian duyệt mẫu và sản xuất, nên tháng 10 – 11 là lúc nên chốt danh sách người nhận và ngân sách.",
      "Bài này chia quà Tết theo nhóm người nhận và bốn mức ngân sách, kèm lịch đặt hàng gợi ý để doanh nghiệp không bị dồn việc vào tháng Chạp. Giá các món đồ da và set quà là ngân sách tham khảo, giá chính thức chốt theo số lượng và mẫu.",
    ],
    soSanh: {
      tieuDe: "Gợi ý quà Tết 2027 theo ngân sách cho mỗi người nhận",
      cot: ["Ngân sách / người", "Gợi ý quà", "Phù hợp với"],
      dong: [
        [
          "Dưới 150.000 đ",
          "Bình hoặc ly giữ nhiệt nhập khẩu in logo, giá bình từ 65.000 đ/cái (chưa VAT, chưa gồm in logo)",
          "Nhân viên, cộng tác viên, quà phát số lượng lớn",
        ],
        [
          "150.000 – 350.000 đ",
          "Khung ảnh da, khung gỗ, móc khóa da khắc hoặc ép chìm logo (150.000 – 300.000 đ); bình Lock&Lock in logo từ 250.000 đ/cái đã gồm VAT; túi trống thêu tên bé 250.000 – 350.000 đ",
          "Khách hàng thân thiết; quà gửi con của nhân viên",
        ],
        [
          "450.000 – 1.500.000 đ",
          "Set sổ da đa năng có sạc dự phòng, USB và bút ký, đóng hộp (450.000 – 950.000 đ); ví hoặc túi công tác bằng da khắc logo (500.000 – 1.500.000 đ)",
          "Quản lý, khách hàng quan trọng",
        ],
        [
          "800.000 – 2.000.000 đ",
          "Set quà Tết cao cấp: ấm chén sứ in logo, rượu vang, bút ký, linh vật năm Đinh Mùi 2027, lịch để bàn, tranh canvas sắc xuân. Ấm chén sứ in logo mua riêng: 250.000 – 759.000 đ/bộ",
          "Đối tác chiến lược, ban lãnh đạo, khách hàng VIP",
        ],
      ],
    },
    yChinhDanDat: "Năm bước lên kế hoạch quà Tết 2027 cho doanh nghiệp:",
    yChinh: [
      {
        tieuDe: "Chia người nhận thành nhóm, mỗi nhóm một mức ngân sách",
        noiDung:
          "Nhân viên, khách hàng và đối tác mong đợi những món quà khác nhau. Một món quà chung cho tất cả thường quá đắt với nhóm đông người hoặc quá đơn giản với đối tác quan trọng. Lập danh sách theo ba nhóm trước, rồi mới chọn quà.",
      },
      {
        tieuDe: "Ưu tiên quà còn dùng được sau Tết",
        noiDung:
          "Bánh kẹo, giỏ quà thực phẩm hết trong vài ngày. Đồ dùng hằng ngày như bình giữ nhiệt, cốc gốm ở lại trên bàn làm việc cả năm, và logo doanh nghiệp xuất hiện mỗi lần người nhận dùng.",
      },
      {
        tieuDe: "Nghĩ đến gia đình người nhận",
        noiDung:
          "Một món quà cho con của nhân viên, như túi trống thêu tên bé, thường tạo thiện cảm sâu hơn một món quà chỉ dành cho người nhận. Cả nhà cùng biết doanh nghiệp đã nhớ đến mình.",
      },
      {
        tieuDe: "Chốt logo và mẫu in thật trước khi chốt số lượng",
        noiDung:
          "Gửi logo dạng file gốc (AI, PDF hoặc SVG) để in sắc nét. Yêu cầu xem bản dựng logo trên sản phẩm, và với đơn lớn thì xem mẫu in thật, trước khi sản xuất hàng loạt. Chọn luôn kiểu hộp hợp với món quà: hộp âm dương, hộp nam châm, hộp gỗ, hộp da PU hoặc hộp hai cửa.",
      },
      {
        tieuDe: "Đi theo lịch đặt hàng ngược từ ngày Tết",
        noiDung:
          "Tháng 10: chốt danh sách người nhận và ngân sách. Trước 15/11: chọn mẫu và duyệt logo. Trước 15/12: chốt số lượng, đặt sản xuất. Trước 20/1/2027: nhận hàng, đóng gói và viết thiệp, còn hơn hai tuần để trao quà trước Tết.",
      },
    ],
    lienKet: [
      {
        nhan: "Xem catalogue bình giữ nhiệt",
        moTa: "39 mẫu bình và ly giữ nhiệt nhập khẩu, giá từ 65.000 đ",
        href: "/catalogue-binh-giu-nhiet",
      },
      {
        nhan: "So sánh bình nhập khẩu và Lock&Lock",
        moTa: "Chất liệu, số lượng tối thiểu, thời gian giao",
        href: "/bai-viet/binh-giu-nhiet-in-logo-qua-tang-doanh-nghiep",
      },
      {
        nhan: "Xem túi thêu tên bé",
        moTa: "Quà cho con của nhân viên, 250.000 – 350.000 đ",
        href: "/san-pham/tui-tre-em",
      },
    ],
    hoiDap: [
      {
        hoi: "Tết Nguyên đán 2027 là ngày nào?",
        dap: "Mùng 1 Tết Đinh Mùi rơi vào thứ Bảy, ngày 6/2/2027 dương lịch.",
      },
      {
        hoi: "Set quà Tết cao cấp cho doanh nghiệp gồm những gì, giá bao nhiêu?",
        dap: "Một set quà Tết cao cấp có thể gồm ấm chén sứ in logo, rượu vang, bút ký, linh vật năm Đinh Mùi 2027, lịch để bàn và tranh canvas sắc xuân. Ngân sách tham khảo 800.000 – 2.000.000 đ/set; riêng bộ ấm chén sứ in logo 250.000 – 759.000 đ/bộ. Giá chính thức chốt theo số lượng và mẫu.",
      },
      {
        hoi: "Quà Tết có những kiểu hộp nào?",
        dap: "Tùy món quà, có thể chọn hộp âm dương, hộp nam châm, hộp gỗ, hộp da PU hoặc hộp hai cửa.",
      },
      {
        hoi: "Nên đặt quà Tết có in logo trước bao lâu?",
        dap: "Nên chốt mẫu và logo trước giữa tháng 11, đặt sản xuất trước giữa tháng 12 để nhận hàng trước ngày 20/1/2027. Bình Lock&Lock in logo giao trong 5 – 10 ngày, nhưng cuối năm các xưởng in thường kín lịch nên đặt sớm vẫn an toàn hơn.",
      },
      {
        hoi: "Quà Tết cho nhân viên nên chọn mức giá nào?",
        dap: "Với số lượng lớn, mức dưới 150.000 đ/người như bình giữ nhiệt nhập khẩu in logo là phổ biến. Doanh nghiệp muốn quà có thương hiệu rõ ràng hơn có thể chọn bình Lock&Lock từ 250.000 đ/cái đã gồm in logo.",
      },
      {
        hoi: "Đặt quà Tết in logo tối thiểu bao nhiêu cái?",
        dap: "Với bình giữ nhiệt, giá tốt nhất áp dụng từ 100 cái. Bình nhập khẩu vẫn nhận đơn nhỏ hơn: đơn 50 – 100 cái cộng thêm 5.000 đ/cái, dưới 50 cái cộng thêm 10.000 đ/cái.",
      },
      {
        hoi: "Có xuất hóa đơn VAT cho quà Tết doanh nghiệp không?",
        dap: "Có. Đơn hàng được xuất hóa đơn VAT bởi Công ty TNHH Nguyên Khánh Vina, đơn vị vận hành thương hiệu Chọn Quà Chuẩn.",
      },
    ],
    ketBai: [
      "Tóm lại: chia người nhận thành ba nhóm, chọn quà dùng được lâu sau Tết, và đặt hàng ngược từ ngày 6/2/2027. Doanh nghiệp chốt sớm trong tháng 10 – 11 sẽ có nhiều mẫu để chọn và đủ thời gian duyệt logo.",
      "Chọn Quà Chuẩn là thương hiệu quà tặng của Công ty TNHH Nguyên Khánh Vina tại TP. Hồ Chí Minh, nhận tư vấn và in, khắc logo quà Tết theo yêu cầu riêng của từng doanh nghiệp.",
    ],
    loiMoiTuVan:
      "Gửi số người nhận và ngân sách dự kiến, Chọn Quà Chuẩn sẽ gợi ý bộ quà Tết 2027 cho từng nhóm và dựng thử logo để bạn duyệt trước.",
  },
  {
    // Bài để Google / Bing / AI tìm kiếm đọc được (hai catalogue lật trang là ảnh, máy không đọc).
    // Số liệu lấy từ bảng giá bình nhập (39 mẫu) và báo giá Lock&Lock 23/09/2026; chị Nga chốt
    // 30/09/2026: chỉ ghi "giá từ", không ghi giá từng mẫu. NKV MUA bình Lock&Lock rồi gia công
    // in logo — không viết thành "đại lý" hay "nhà phân phối".
    id: "binh-giu-nhiet-in-logo-doanh-nghiep",
    href: "/bai-viet/binh-giu-nhiet-in-logo-qua-tang-doanh-nghiep",
    chuyenMuc: "Quà tặng doanh nghiệp",
    title: "Bình giữ nhiệt in logo làm quà tặng doanh nghiệp: chọn hàng nhập khẩu hay Lock&Lock?",
    tomTat:
      "So sánh hai dòng bình giữ nhiệt in logo cho doanh nghiệp: hàng nhập khẩu giá từ 65.000 đ và Lock&Lock giá từ 250.000 đ — chất liệu, số lượng tối thiểu, thời gian giao và cách chọn theo ngân sách.",
    tieuDeSeo: "Bình giữ nhiệt in logo quà tặng doanh nghiệp: giá, cách chọn",
    moTaSeo:
      "Bình giữ nhiệt in logo cho doanh nghiệp: hàng nhập khẩu từ 65.000 đ, Lock&Lock từ 250.000 đ. So sánh chất liệu, số lượng tối thiểu, thời gian giao.",
    ngayDang: "2026-09-30",
    anh: "/marketing/post-binh-giu-nhiet-in-logo.jpg",
    anhRong: 1200,
    anhCao: 738,
    anhAlt: "Bốn bình giữ nhiệt inox màu xanh mint, trắng, đen và hồng, nắp có quai xách bằng kim loại",
    anhGhiChu: "Bình giữ nhiệt nhập khẩu — một trong 39 mẫu có thể in hoặc khắc logo doanh nghiệp.",
    moDau: [
      "Bình giữ nhiệt in logo là món quà doanh nghiệp được dùng hằng ngày: đặt trên bàn làm việc, mang theo khi đi họp, đi công tác. Mỗi lần người nhận dùng là một lần logo của doanh nghiệp xuất hiện.",
      "Câu hỏi thường gặp nhất khi lên ngân sách là: nên chọn bình nhập khẩu giá tốt, hay bình thương hiệu Lock&Lock? Hai dòng này phục vụ hai mục đích khác nhau. Bảng dưới đây so sánh nhanh để bạn chọn đúng theo ngân sách và người nhận.",
    ],
    soSanh: {
      tieuDe: "So sánh nhanh hai dòng bình giữ nhiệt in logo",
      cot: ["Tiêu chí", "Bình nhập khẩu", "Bình Lock&Lock"],
      dong: [
        ["Giá tham khảo", "Từ 65.000 đ/cái (chưa VAT, chưa gồm in logo)", "Từ 250.000 đ/cái (đã gồm VAT và in logo)"],
        ["Chất liệu", "Lòng trong inox 304, vỏ ngoài inox 201 sơn màu; một số mẫu lòng inox 316", "Hai lớp inox 304; có mẫu inox 316"],
        ["Dung tích", "300 ml – 1.000 ml", "400 ml – 800 ml"],
        ["Số mẫu", "39 mẫu: bình, ly giữ nhiệt, bình vỏ tre, bình thủy tinh", "10 mẫu bình Lock&Lock"],
        ["In logo", "In hoặc khắc laser theo yêu cầu, báo giá riêng theo thiết kế", "Miễn phí in 1–2 màu hoặc khắc logo 1 vị trí"],
        ["Số lượng đặt", "Giá tốt nhất từ 100 cái; dưới 100 cái cộng thêm 5.000 – 10.000 đ/cái", "Từ 100 cái, giá giảm dần theo mức 300 và 800 cái"],
        ["Thời gian giao", "Hàng có sẵn; đơn in logo giao theo lịch sau khi duyệt mẫu", "5 – 10 ngày"],
        ["Phù hợp", "Sự kiện, hội nghị, quà nhân viên, quà số lượng lớn", "Quà đối tác, khách hàng thân thiết, quà tri ân cuối năm"],
      ],
    },
    yChinhDanDat: "Bốn bước chọn bình giữ nhiệt in logo đúng ngân sách:",
    yChinh: [
      {
        tieuDe: "Bắt đầu từ người nhận, không bắt đầu từ mẫu bình",
        noiDung:
          "Quà phát rộng cho sự kiện, hội nghị, nhân viên thì ưu tiên số lượng và đồng đều — dòng nhập khẩu giá từ 65.000 đ đáp ứng tốt. Quà cho đối tác, khách hàng quan trọng thì thương hiệu bình cũng là một phần giá trị món quà — nên chọn Lock&Lock.",
      },
      {
        tieuDe: "Nhìn vào chất liệu lòng bình",
        noiDung:
          "Lòng bình tiếp xúc trực tiếp với nước uống nên cần là inox 304 hoặc 316. Inox 316 chống ăn mòn tốt hơn, hợp với người hay đựng nước chanh, trà, nước có vị chua mặn. Vỏ ngoài inox 201 sơn màu không tiếp xúc nước uống, chủ yếu quyết định màu sắc và giá thành.",
      },
      {
        tieuDe: "Chọn dung tích theo cách dùng",
        noiDung:
          "Bình 350 – 500 ml vừa túi xách, hợp dân văn phòng. Bình 600 – 800 ml hợp người hay di chuyển, tập thể thao. Ly giữ nhiệt 500 – 900 ml có ống hút hợp để bàn làm việc và mang theo xe.",
      },
      {
        tieuDe: "Chốt vị trí và cách in logo trước khi chốt số lượng",
        noiDung:
          "In lụa 1–2 màu cho logo đơn giản, khắc laser cho vẻ sang và bền, in chuyển sắc cho logo nhiều màu (có phát sinh phí). Hãy yêu cầu xem mẫu in thật hoặc bản dựng trên bình trước khi sản xuất hàng loạt.",
      },
    ],
    lienKet: [
      {
        nhan: "Xem catalogue bình nhập khẩu",
        moTa: "39 mẫu bình và ly giữ nhiệt, giá từ 65.000 đ",
        href: "/catalogue-binh-giu-nhiet",
      },
      {
        nhan: "Xem bảng giá bình Lock&Lock",
        moTa: "10 mẫu, giá từ 250.000 đ đã gồm in logo",
        href: "/catalogue-binh-lock-lock",
      },
    ],
    hoiDap: [
      {
        hoi: "In logo lên bình giữ nhiệt giá bao nhiêu?",
        dap: "Với bình Lock&Lock, giá từ 250.000 đ/cái đã gồm VAT và miễn phí in 1–2 màu hoặc khắc logo 1 vị trí. Với bình nhập khẩu, giá bình từ 65.000 đ/cái chưa gồm VAT; phí in hoặc khắc logo được báo riêng theo thiết kế và số lượng.",
      },
      {
        hoi: "Đặt bình giữ nhiệt in logo tối thiểu bao nhiêu cái?",
        dap: "Mức giá tốt nhất áp dụng từ 100 cái. Với bình nhập khẩu, đơn 50 – 100 cái cộng thêm 5.000 đ/cái, dưới 50 cái cộng thêm 10.000 đ/cái.",
      },
      {
        hoi: "Inox 304 và inox 316 khác nhau thế nào?",
        dap: "Cả hai đều là inox dùng cho đồ đựng thực phẩm. Inox 316 có thêm molypden nên chống ăn mòn tốt hơn với muối và axit nhẹ, giá cao hơn inox 304. Với nhu cầu đựng nước uống thông thường, inox 304 là đủ.",
      },
      {
        hoi: "Đặt bình giữ nhiệt in logo bao lâu có hàng?",
        dap: "Bình Lock&Lock in logo giao trong 5 – 10 ngày. Bình nhập khẩu có sẵn hàng; đơn in logo giao theo lịch thống nhất sau khi doanh nghiệp duyệt mẫu.",
      },
      {
        hoi: "Bình Lock&Lock in logo có phải hàng của hãng không?",
        dap: "Nguyên Khánh Vina mua bình từ hãng Lock&Lock, sau đó gia công in hoặc khắc logo theo yêu cầu của doanh nghiệp.",
      },
      {
        hoi: "Có xuất hóa đơn VAT và giao hàng tận nơi không?",
        dap: "Có. Đơn hàng được xuất hóa đơn VAT bởi Công ty TNHH Nguyên Khánh Vina. Đơn Lock&Lock miễn phí giao hàng nội thành TP. Hồ Chí Minh; các khu vực khác báo phí vận chuyển theo thực tế.",
      },
    ],
    ketBai: [
      "Tóm lại: ngân sách dưới 150.000 đ/cái và số lượng lớn thì chọn bình nhập khẩu; ngân sách từ 250.000 đ/cái và người nhận là đối tác, khách hàng quan trọng thì chọn Lock&Lock. Nhiều doanh nghiệp đặt song song cả hai dòng cho hai nhóm người nhận trong cùng một dịp.",
      "Chọn Quà Chuẩn là thương hiệu quà tặng của Công ty TNHH Nguyên Khánh Vina tại TP. Hồ Chí Minh — nhận in, khắc logo bình giữ nhiệt theo yêu cầu riêng của từng doanh nghiệp.",
    ],
    loiMoiTuVan:
      "Gửi logo và số lượng dự kiến, Chọn Quà Chuẩn sẽ gợi ý mẫu bình phù hợp ngân sách và dựng thử logo lên bình cho bạn xem trước.",
  },
  {
    // Cùng nội dung bài Fanpage hẹn giờ 07:00 16/09/2026 — bản Word ở
    // D:\ChonQuaChuan\Anh Tai lieu dang bai\2026-09-15_BAIDANG_CQC_xu-huong-qua-tet-2027.docx
    id: "xu-huong-qua-tang-tet-2027",
    href: "/bai-viet/xu-huong-qua-tang-tet-2027",
    chuyenMuc: "Xu hướng quà Tết",
    title: "Xu hướng quà tặng Tết 2027: Sáng tạo để trao giá trị, chạm vào cảm xúc",
    tomTat:
      "Quà Tết 2027 không còn gói gọn trong những giỏ quà khuôn mẫu — sáng tạo gặp gỡ giá trị thiết thực, tạo nên trải nghiệm cảm xúc khác biệt.",
    tieuDeSeo: "Xu hướng quà tặng Tết 2027 cho doanh nghiệp",
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
