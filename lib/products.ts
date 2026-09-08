import { supabase } from "./supabase";

export type Product = {
  id: string;
  name: string;
  description: string;
  price_display: string;
  category: string;
  is_digital: boolean;
  color: string;
  // Duong dan anh that (vd "/products/tui-tre-em.jpg") - de trong (undefined)
  // thi giao dien tu dong lui ve khoi mau + icon nhu truoc. Dung lam anh dai
  // dien (the san pham, khu Noi bat trang chu).
  image?: string;
  // Toan bo anh cho trang chi tiet san pham (gallery nhieu anh kieu Etsy).
  // De trong thi trang chi tiet chi hien 1 anh dai dien (`image`) o tren.
  images?: string[];
  // Mo ta day du (nhieu doan) rieng cho trang chi tiet san pham - `description`
  // van la ban ngan dung cho the san pham/trang chu. De trong thi trang chi
  // tiet lui ve dung `description`.
  long_description?: string;
};

// Dữ liệu mẫu — dùng khi chưa nối Supabase, hoặc làm dữ liệu seed ban đầu
// (xem supabase/schema.sql). Giữ đồng bộ nội dung với bản thiết kế đã duyệt.
export const seedProducts: Product[] = [
  {
    id: "tra-thao-moc",
    name: "Set Trà Thảo Mộc Thủ Công",
    description: "Trà sen, trà hoa cúc thủ công kèm hộp gỗ khắc logo.",
    price_display: "500.000đ - 700.000đ",
    category: "vat-ly",
    is_digital: false,
    color: "var(--accent)",
  },
  {
    id: "ebook-loi-chuc",
    name: "Ebook 30 Lời Chúc Ý Nghĩa",
    description: "File PDF tuyển chọn lời chúc theo dịp tặng.",
    price_display: "49.000đ",
    category: "qua-so",
    is_digital: true,
    color: "oklch(0.6 0.1 250)",
  },
  {
    id: "nen-thom",
    name: "Hộp Nến Thơm Handmade",
    description: "Nến sáp đậu nành thơm tự nhiên, thiết kế tối giản.",
    price_display: "450.000đ - 650.000đ",
    category: "vat-ly",
    is_digital: false,
    color: "var(--sage)",
  },
  {
    id: "khoa-hoc-goi-qua",
    name: "Khóa Học Mini: Gói Quà Đẹp",
    description: "Video hướng dẫn gói quà tại nhà, 5 bài.",
    price_display: "199.000đ",
    category: "qua-so",
    is_digital: true,
    color: "oklch(0.62 0.13 20)",
  },
  {
    id: "van-phong-tri-an",
    name: "Set Văn Phòng Tri Ân",
    description: "Sổ tay da, bút kim loại khắc tên, hộp quà sang trọng.",
    price_display: "600.000đ - 900.000đ",
    category: "doi-tac",
    is_digital: false,
    color: "oklch(0.62 0.1 80)",
  },
  {
    id: "thiep-tet",
    name: "File Thiệp Chúc Tết Thiết Kế Riêng",
    description: "File in thiệp tuỳ chỉnh tên công ty.",
    price_display: "89.000đ",
    category: "qua-so",
    is_digital: true,
    color: "oklch(0.6 0.14 350)",
  },
  {
    id: "tui-qua-tet",
    name: "Túi Quà Tết Sáng Tạo",
    description: "Mứt thủ công, trà, thiệp chúc Tết thiết kế riêng.",
    price_display: "500.000đ - 800.000đ",
    category: "vat-ly",
    is_digital: false,
    color: "oklch(0.6 0.12 300)",
  },
  {
    id: "cham-soc-ca-nhan",
    name: "Set Chăm Sóc Cá Nhân",
    description: "Tinh dầu, xà phòng handmade, khăn cotton hữu cơ.",
    price_display: "550.000đ - 750.000đ",
    category: "vat-ly",
    is_digital: false,
    color: "oklch(0.6 0.16 130)",
  },
  {
    id: "tui-tre-em",
    name: "Túi Trẻ Em (cá nhân hoá theo yêu cầu)",
    description: "Túi đeo chéo in tên riêng, nhiều ngăn tiện lợi, cho bé từ tiểu học trở lên.",
    price_display: "250.000đ - 350.000đ",
    category: "vat-ly",
    is_digital: false,
    color: "oklch(0.68 0.15 10)",
    image: "/products/tui-tre-em.jpg",
    images: [
      "/products/tui-tre-em.jpg",
      "/products/tui-tre-em-2.jpg",
      "/products/tui-tre-em-3.jpg",
      "/products/tui-tre-em-4.jpg",
    ],
    long_description:
      "Túi có thể dùng làm túi mang chăn gối đi học bán trú, túi du lịch cuối tuần, hoặc túi đi chơi xa cùng ba mẹ — một phụ kiện đa năng, phù hợp nhiều dịp khác nhau.\n\nKhông chỉ có vẻ ngoài sành điệu, túi còn sở hữu không gian chứa đồ rộng rãi cùng nhiều ngăn tiện lợi, giúp sắp xếp đồ đạc ngăn nắp — lựa chọn thiết thực cho nhu cầu di chuyển của trẻ em từ tiểu học trở lên.\n\nDây đeo vai có thể tháo rời và điều chỉnh độ dài, dễ dàng tuỳ chỉnh để đeo thoải mái nhất.\n\nChi tiết chữ cái cá nhân hoá (in decal nhiệt lên vải) biến chiếc túi thành món quà tuyệt vời, mang dấu ấn riêng mà các bé sẽ vô cùng yêu thích.",
  },
  {
    id: "chai-thuy-tinh",
    name: "Chai Nước Thủy Tinh Trong Suốt",
    description: "Chai thủy tinh nắp vặn kín, hai dung tích 300ml và 500ml, nhận in logo theo yêu cầu.",
    price_display: "Liên hệ",
    category: "vat-ly",
    is_digital: false,
    color: "oklch(0.86 0.05 220)",
    // Anh dai dien co chu y chon tam co ba chai kich co khac nhau dung canh
    // nhau, de nguoi xem hieu ngay san pham co nhieu dung tich (300ml/500ml)
    // ma khong can doc chu.
    image: "/products/chai-thuy-tinh.jpg",
    images: [
      "/products/chai-thuy-tinh.jpg",
      "/products/chai-thuy-tinh-2.jpg",
      "/products/chai-thuy-tinh-3.jpg",
      "/products/chai-thuy-tinh-4.jpg",
    ],
    long_description:
      "Thân trụ tối giản, thủy tinh trong vắt nhìn rõ đồ uống bên trong, nắp vặn kín không lo rò rỉ khi để trong túi xách. Một chiếc chai đủ đẹp để đặt trên bàn họp tiếp khách, đủ bền để mang theo cả ngày dài.\n\nTrong doanh nghiệp: đặt bàn phòng họp tiếp khách, trang bị cho khách sạn và văn phòng, làm quà tặng đối tác và nhân viên, phục vụ hội nghị và sự kiện cơ quan đoàn thể.\n\nSự kiện và dịp kỷ niệm: quà cưới, quà lễ tốt nghiệp, quà họp lớp và kỷ niệm trường, quà lưu niệm cho giải thể thao và hoạt động phong trào.\n\nDùng cá nhân: mang theo khi đi bộ đường dài, cắm trại, du lịch, hoặc đơn giản là một tách trà chiều tại nhà. Dùng được với cả đồ uống nóng và đồ uống lạnh.\n\nHai dung tích 300ml và 500ml — chọn 300ml cho bàn họp và bàn làm việc, 500ml cho người mang theo cả ngày. Nắp nhựa có ron bên trong, miệng chai rộng nên dễ cho đá viên vào và dễ rửa sạch tận đáy.\n\nNhận in logo lên thân chai theo yêu cầu, tư vấn vị trí và kích thước in phù hợp với từng dung tích.",
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return seedProducts;

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, name, description, price_display, category, is_digital, color, image, images, long_description"
    )
    .eq("active", true);

  if (error || !data || data.length === 0) return seedProducts;
  return data as Product[];
}

// Sản phẩm ghim lên khu nổi bật ở trang chủ — nơi muốn đẩy mạnh bán hàng.
// ĐỔI SẢN PHẨM NỔI BẬT: chỉ cần sửa 3 id dưới đây, không phải đụng giao diện.
// Thứ tự có ý nghĩa: id đầu tiên là sản phẩm chính (ô lớn, kèm mô tả + nút
// bấm ở cột chữ bên trái); id thứ hai hiện ở ô nhỏ nằm ngay CẠNH ô lớn
// (2026-09-08: thêm Chai thủy tinh vào đây theo yêu cầu, lấp khoảng trống
// bên phải ảnh Túi trẻ em).
export const FEATURED_IDS = ["tui-tre-em", "chai-thuy-tinh", "van-phong-tri-an"];

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const picked = FEATURED_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p): p is Product => Boolean(p)
  );

  // Nếu id ghim không còn tồn tại (sản phẩm bị xoá/đổi tên), lấp bằng sản phẩm
  // đầu danh sách để khu nổi bật không bao giờ trống.
  const fallback = all.filter((p) => !picked.some((q) => q.id === p.id));
  return [...picked, ...fallback].slice(0, 3);
}
