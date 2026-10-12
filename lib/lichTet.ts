// Lịch Tết 2027 — trang /lich-tet-2027 (các loại lịch) và /lich-tet-2027/<loại> (các mẫu của loại đó).
//
// - Ảnh mẫu ở public/lich-tet-2027/<slug>/NN.jpg (1600px, có dải QR web + Zalo OA phía dưới)
//   và NN-nho.jpg (640px, không QR, dùng cho lưới). Dựng lại bằng script xuat_anh.py
//   (WebP: lớn 2400px, nhỏ 1280px — chị thấy bản 1600/640 JPEG bị mờ; og.jpg 1200px để chia sẻ FB/Zalo)
//   (lấy từ catalogue PDF của xưởng trong D:\NKV\10.Lịch 2027, bỏ trang trùng/trang bìa/cảm ơn).
// - Giá bán = bảng giá NKV áp dụng từ 10/10/2026, ĐÃ GỒM VAT 8%:
//   lịch bàn / bìa / bộ 13 tờ = giá xưởng +30%; bloc = giá xưởng +20%; làm tròn lên 500 đ.
//   BLOC (cập nhật 11/10/2026 theo file ..._Lich-va-Bloc-lich-2027_v2-tiet-kiem-30-32.pdf):
//   giá bán = giá bìa × 0,69 làm tròn 500 đ -> khách tiết kiệm 30 – 32% so với giá bìa;
//   riêng Bloc đại 42.000 / Bloc lỡ 39.000 (chị chốt 11/10/2026) -> tiết kiệm 44 – 51%. Chung: 30 – 51%.
//   File gốc: D:\NKV\10.Lịch 2027\2026-10-10_BANGGIA_NKV_*.pdf. Đổi giá thì sửa ở đây.
// - giaBia = giá bán lẻ in sẵn trên lịch = giá thị trường; nhãn "Tiết kiệm x%" = mức khách được lợi so với giá bìa.
//   Không viết "giá tốt nhất / rẻ nhất": Luật Quảng cáo cấm dùng từ "nhất" khi không có tài liệu chứng minh.
// AN/HIEN trang Lich Tet 2027 (12/10/2026 chi Nga: AN — cho hinh + video mau lich dat moi dua len lai).
// false: /lich-tet-2027, /lich-tet-2027/<loai> va bai viet lich tra 404, khong co trong sitemap/trang chu.
// Dua len lai: doi thanh true roi push.
export const HIEN_LICH_TET = false;
// 12/10/2026: noi dung bai lich Tet 131 mau GOP vao trang /lich-go-2027 (muc #lich-tet-2027).
// /lich-tet-2027 va link bai cu chuyen huong ve do (next.config.mjs); cac trang LOAI van mo de khach xem mau.
export const HIEN_TRANG_LOAI = true;
// 12/10/2026 (chị Nga): bài viết lịch Tết 2027 hiện lại ĐÚNG VỊ TRÍ CŨ trên trang chủ (cột trái khu bài viết).
export const HIEN_BAI_LICH_TET = true;

export type DongGia = { ten: string; giaBia?: number; gia: number };

export type LoaiLich = {
  slug: string;
  ten: string;
  moTaNgan: string; // dưới tên ở thẻ loại lịch
  moTa: string; // đầu trang loại lịch + mô tả cho Google
  quyCach: string[];
  gia: DongGia[];
  ghiChuGia?: string;
  soMau: number;
  anhRong: number;
  anhCao: number;
  anhNhoCao: number;
  anhDaiDien: number; // số thứ tự ảnh dùng làm ảnh đại diện của loại
};

export const NGAY_AP_DUNG = "10/10/2026";

export const LOAI_LICH: LoaiLich[] = [
  {
    slug: "lich-de-ban",
    ten: "Lịch để bàn",
    moTaNgan: "Lịch bàn chữ A, chữ M có note 52 tuần, kèm túi",
    moTa: "Lịch để bàn 2027 13 tờ 26 mặt, khổ 25 x 18 cm, đế metalize 4 màu (đỏ, dương, lá, kem), in logo doanh nghiệp trên đế lịch.",
    quyCach: [
      "13 tờ – 26 mặt, khổ 25 x 18 cm, có note 52 tuần",
      "Giấy Couche 250 gsm, đế metalize cao cấp",
      "Đế lịch 4 màu: xanh dương, đỏ, xanh lá, kem",
      "Kèm túi đựng",
    ],
    gia: [
      { ten: "Lịch bàn chữ A (kèm túi)", gia: 29500 },
      { ten: "Lịch bàn chữ M (kèm túi)", gia: 43500 },
    ],
    soMau: 22,
    anhRong: 2400,
    anhCao: 1518,
    anhNhoCao: 642,
    anhDaiDien: 1,
  },
  {
    slug: "bia-lich-gan-bloc",
    ten: "Bìa lịch gắn bloc",
    moTaNgan: "Bìa lò xo giữa 37 x 70 cm, bế nổi / dán nổi 3D",
    moTa: "Bìa lịch treo tường 2027 lò xo giữa, khổ mở 37 x 70 cm, in metalize hologram 7 màu, chiết quang, bế nổi hoặc dán nổi 3D, gắn được bloc đại, bloc lỡ và bloc trung.",
    quyCach: [
      "Khổ gấp 37 x 35 cm, khổ mở 37 x 70 cm",
      "In metalize hologram 7 màu, chiết quang, bế nổi hoặc dán nổi 3D",
      "Gắn được bloc đại 14,5 x 20,5 cm, bloc lỡ 13 x 19 cm, bloc trung 10,5 x 14,5 cm",
      "Có ô “Phần in quảng cáo” để in logo, tên và thông tin doanh nghiệp",
    ],
    gia: [
      { ten: "Bìa 37 x 70 bế nổi gắn bloc", gia: 37000 },
      { ten: "Bìa 37 x 70 dán nổi gắn bloc", gia: 53500 },
      { ten: "Bìa đại ván MDF 3 mm", gia: 37000 },
      { ten: "Bìa khung vàng", gia: 84500 },
      { ten: "Bloc đại 14,5 x 20,5 cm (mua lẻ)", giaBia: 85000, gia: 42000 },
      { ten: "Bloc lỡ 13 x 19 cm (mua lẻ)", giaBia: 70000, gia: 39000 },
    ],
    ghiChuGia: "Giá bìa lịch chưa gồm bloc. Lịch hoàn chỉnh = giá bìa lịch + giá bloc.",
    soMau: 32,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 12,
  },
  {
    slug: "lich-13-to",
    ten: "Lịch treo tường 13 tờ",
    moTaNgan: "Bộ số 13 tờ khổ 37 x 70 cm, bế nổi / dán nổi",
    moTa: "Lịch treo tường 13 tờ 2027 khổ mở 37 x 70 cm, giấy Couche 120 gsm, ván MDF, in metalize, ép vân, bế nổi hoặc dán nổi, có ô in quảng cáo cho doanh nghiệp.",
    quyCach: [
      "Khổ mở 37 x 70 cm, 13 tờ",
      "Giấy Couche 120 gsm, ván MDF",
      "In metalize, ép vân, bế nổi hoặc dán nổi",
      "Có ô “Phần in quảng cáo” để in logo doanh nghiệp",
    ],
    gia: [
      { ten: "Bộ số 13 tờ bế nổi", gia: 37000 },
      { ten: "Bộ số 13 tờ dán nổi", gia: 53500 },
    ],
    soMau: 12,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 1,
  },
  {
    slug: "bloc-dai-15x21",
    ten: "Bloc đại & bloc lỡ",
    moTaNgan: "Bloc đại 14,5 x 20,5 và bloc lỡ 13 x 19, mua lẻ",
    moTa: "Lịch bloc đại 2027 khổ 14,5 x 20,5 cm và bloc lỡ 13 x 19 cm, áo bloc in metalize 7 màu, ruột in 6 màu giấy Couche Matt 57 gsm, gáy đóng keo nóng, gắn vào bìa lịch treo tường.",
    quyCach: [
      "Bloc đại 14,5 x 20,5 cm, bloc lỡ 13 x 19 cm",
      "Áo bloc in metalize 7 màu, ruột in 6 màu giấy Couche Matt 57 gsm",
      "Gáy đóng keo nóng, ốc thông minh đầu tròn",
      "Gắn vào bìa lịch treo tường (xem mục Bìa lịch gắn bloc)",
    ],
    gia: [
      { ten: "Bloc đại 14,5 x 20,5 cm (mua lẻ)", giaBia: 85000, gia: 42000 },
      { ten: "Bloc lỡ 13 x 19 cm (mua lẻ)", giaBia: 70000, gia: 39000 },
    ],
    soMau: 8,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 1,
  },
  {
    slug: "bloc-17x24",
    ten: "Bloc đại đặc biệt 17 x 24",
    moTaNgan: "Trọn bộ bìa treo + bloc + hộp quà",
    moTa: "Lịch bloc đại đặc biệt 2027 khổ 17 x 24 cm, bìa treo bồi metalize 7 màu ép nổi 3D, hộp ép kim, nẹp chiết quang 3D, trọn bộ làm quà Tết doanh nghiệp.",
    quyCach: [
      "Bloc 17 x 24 cm, giấy Couche Matt 57 gsm",
      "Bìa treo bồi metalize 7 màu, ép nổi 3D",
      "Hộp ép kim toàn phần, chiết quang nổi 3D",
      "Nẹp thông minh chiết quang 3D",
    ],
    gia: [
      { ten: "Trọn bộ bloc đại đặc biệt 17 x 24", giaBia: 250000, gia: 172500 },
      { ten: "Bloc 17 x 24 rời (có nẹp)", giaBia: 135000, gia: 93000 },
    ],
    soMau: 8,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 1,
  },
  {
    slug: "bloc-20x30",
    ten: "Bloc siêu đại 20 x 30",
    moTaNgan: "Trọn bộ bìa treo + bloc + hộp quà",
    moTa: "Lịch bloc siêu đại 2027 khổ 20 x 30 cm, bìa treo in metalize 7 màu ép nổi 3D, hộp ép kim chiết quang, trọn bộ làm quà Tết cho khách hàng và đối tác.",
    quyCach: [
      "Bloc 20 x 30 cm, giấy Couche Matt 57 gsm",
      "Bìa treo in metalize 7 màu, ép nổi 3D",
      "Hộp ép kim toàn phần, chiết quang nổi 3D",
    ],
    gia: [
      { ten: "Trọn bộ bloc siêu đại 20 x 30", giaBia: 300000, gia: 207000 },
      { ten: "Bloc 20 x 30 rời (có nẹp)", giaBia: 170000, gia: 117500 },
    ],
    soMau: 20,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 2,
  },
  {
    slug: "bloc-25x35",
    ten: "Bloc siêu đại 25 x 35",
    moTaNgan: "Trọn bộ bìa treo + bloc + hộp quà",
    moTa: "Lịch bloc siêu đại 2027 khổ 25 x 35 cm, bìa treo metalize ép nổi 3D, hộp quà cao cấp, phù hợp quà Tết cho khách hàng và đối tác.",
    quyCach: ["Bloc 25 x 35 cm", "Bìa treo in metalize, ép nổi 3D", "Hộp quà cao cấp"],
    gia: [
      { ten: "Trọn bộ bloc siêu đại 25 x 35", giaBia: 400000, gia: 276000 },
      { ten: "Bloc 25 x 35 rời (có nẹp)", giaBia: 280000, gia: 193000 },
    ],
    soMau: 16,
    anhRong: 2400,
    anhCao: 1537,
    anhNhoCao: 652,
    anhDaiDien: 1,
  },
  {
    slug: "bloc-29x41-38x53",
    ten: "Bloc siêu đại 29 x 41 & 38 x 53",
    moTaNgan: "Khổ lớn nhất, làm quà biếu cao cấp",
    moTa: "Lịch bloc siêu đại 29 x 41 cm và siêu cực đại 38 x 53 cm năm 2027, khổ lớn nhất, bìa treo ép nổi 3D kèm hộp quà, làm quà biếu Tết cao cấp.",
    quyCach: ["Bloc 29 x 41 cm hoặc 38 x 53 cm", "Bìa treo in metalize, ép nổi 3D", "Hộp quà cao cấp"],
    gia: [
      { ten: "Trọn bộ bloc siêu cực đại 38 x 53", giaBia: 790000, gia: 545000 },
      { ten: "Trọn bộ bloc siêu đại 29 x 41", giaBia: 550000, gia: 379500 },
      { ten: "Bloc 29 x 41 rời (có nẹp)", giaBia: 350000, gia: 241500 },
    ],
    soMau: 13,
    anhRong: 2400,
    anhCao: 1515,
    anhNhoCao: 640,
    anhDaiDien: 2,
  },
];

// Món có trong bảng giá nhưng chưa có ảnh mẫu riêng — chỉ hiện ở bảng giá tổng.
export const GIA_KHAC: DongGia[] = [{ ten: "Lịch 52 tuần", giaBia: 300000, gia: 207000 }];

export const GHI_CHU_GIA = [
  "Đơn giá đã gồm VAT 8%, áp dụng từ ngày 10/10/2026 cho đến khi có thông báo mới.",
  "Giá bìa là giá bán lẻ in sẵn trên lịch, cũng là giá bán trên thị trường. Đặt lịch tại Chọn Quà Chuẩn, quý khách tiết kiệm 30 – 51% so với giá bìa (xem nhãn “Tiết kiệm” ở từng dòng).",
  "Hỗ trợ giao hàng MIỄN PHÍ toàn quốc.",
  "Đơn giá có thể thay đổi vào thời điểm cao điểm (thường từ giữa tháng 11/2026 đến 30/12/2026).",
  "Phần in quảng cáo (logo, tên, địa chỉ doanh nghiệp) báo giá theo số lượng và số màu in.",
  "Hóa đơn xuất từ ngày 01/01/2027 áp dụng thuế suất VAT theo quy định tại thời điểm xuất hóa đơn.",
];

export const loaiTheoSlug = (slug: string) => LOAI_LICH.find((l) => l.slug === slug);
export const anhLon = (l: LoaiLich, n: number) => `/lich-tet-2027/${l.slug}/${String(n).padStart(2, "0")}.webp`;
export const anhNho = (l: LoaiLich, n: number) => `/lich-tet-2027/${l.slug}/${String(n).padStart(2, "0")}-nho.webp`;
export const anhChiaSe = (l: LoaiLich) => `/lich-tet-2027/${l.slug}/og.jpg`;
export const giaTu = (l: LoaiLich) => Math.min(...l.gia.map((g) => g.gia));
export const vnd = (v: number) => v.toLocaleString("vi-VN") + " đ";
export const tietKiem = (g: DongGia) => (g.giaBia ? Math.round((1 - g.gia / g.giaBia) * 100) : 0);
