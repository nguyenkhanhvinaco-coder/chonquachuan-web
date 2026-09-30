import type { MetadataRoute } from "next";
import { EBOOKS } from "@/lib/ebook";
import { BAI_VIET } from "@/lib/baiViet";
import { getProducts } from "@/lib/products";

const SITE_URL = "https://chonquachuan.vn";

// Lam moi moi gio de san pham moi trong Supabase tu vao sitemap.
export const revalidate = 3600;

// 2026-09-30 SEO: truoc day moi trang deu ghi lastModified = "bay gio" — Google thay ngay nao cung
// doi nen bo qua tin hieu nay. Gio chi ghi ngay sua THAT cho bai viet va san pham; trang tinh khong ghi.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tinh = [
    "",
    "/tim-qua",
    "/lien-he",
    "/chinh-sach-giao-hang",
    "/chinh-sach-du-lieu-ca-nhan",
    "/thiep-mien-phi",
    "/catalogue-binh-giu-nhiet",
    // Moi trang ebook lay thang tu lib/ebook.ts — them cuon moi la co o day.
    ...EBOOKS.map((b) => b.href),
  ];

  // Chi san pham that (co anh). San pham mau khong co anh da dat noindex o trang san pham.
  const sanPham = (await getProducts()).filter((p) => p.image);

  return [
    ...Array.from(new Set(tinh)).map((route) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.6,
    })),
    ...BAI_VIET.map((b) => ({
      url: `${SITE_URL}${b.href}`,
      lastModified: new Date(b.ngayCapNhat ?? b.ngayDang),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...sanPham.map((p) => ({
      url: `${SITE_URL}/san-pham/${p.id}`,
      ...(p.created_at ? { lastModified: new Date(p.created_at) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
