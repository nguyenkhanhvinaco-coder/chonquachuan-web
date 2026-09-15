import type { MetadataRoute } from "next";
import { EBOOKS } from "@/lib/ebook";
import { BAI_VIET } from "@/lib/baiViet";

const SITE_URL = "https://chonquachuan.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/danh-muc",
    "/tim-qua",
    "/lien-he",
    "/chinh-sach-giao-hang",
    "/chinh-sach-du-lieu-ca-nhan",
    "/thiep-mien-phi",
    // Mọi trang ebook lấy thẳng từ lib/ebook.ts — thêm cuốn mới là có ở đây.
    ...EBOOKS.map((b) => b.href),
    // Bài viết "Kiến thức chọn quà" — cũng lấy thẳng từ lib/baiViet.ts.
    ...BAI_VIET.map((b) => b.href),
  ];

  return Array.from(new Set(routes)).map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
