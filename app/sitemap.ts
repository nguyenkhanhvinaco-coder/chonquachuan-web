import type { MetadataRoute } from "next";

const SITE_URL = "https://chonquachuan.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/danh-muc", "/tim-qua"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
