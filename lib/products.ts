import { supabase } from "./supabase";

export type Product = {
  id: string;
  name: string;
  description: string;
  price_display: string;
  category: string;
  is_digital: boolean;
  color: string;
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
];

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return seedProducts;

  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price_display, category, is_digital, color")
    .eq("active", true);

  if (error || !data || data.length === 0) return seedProducts;
  return data as Product[];
}

// Sản phẩm ghim lên khu nổi bật ở trang chủ — nơi muốn đẩy mạnh bán hàng.
// ĐỔI SẢN PHẨM NỔI BẬT: chỉ cần sửa 3 id dưới đây, không phải đụng giao diện.
// Thứ tự có ý nghĩa: id đầu tiên chiếm ô LỚN, hai id sau nằm ở hai ô nhỏ.
export const FEATURED_IDS = ["tra-thao-moc", "van-phong-tri-an", "tui-qua-tet"];

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
