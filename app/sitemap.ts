import type { MetadataRoute } from "next";

const SITE_URL = "https://chonquachuan.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/danh-muc", "/tim-qua", "/lien-he", "/chinh-sach-du-lieu-ca-nhan", "/thiep-mien-phi"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
