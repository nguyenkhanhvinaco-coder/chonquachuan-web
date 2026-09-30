import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Manrope, Lora } from "next/font/google";
import "./globals.css";

// 2026-09-30 chi Nga chon bo font giong happynuts.vn: tieu de Barlow Semi Condensed, chu thuong
// Manrope. Ca hai la font Google mien phi, co tieng Viet, nhung thang vao web nen MOI may deu
// thay giong nhau (khac Aptos — font Microsoft, khong duoc nhung len web).
const tieuDe = Barlow_Semi_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-tieu-de",
  display: "swap",
});

const chuThuong = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-chu-thuong",
  display: "swap",
});

// Lora chi con dung cho chu tren thiep tranh (components/PaintingCard.tsx) — mau thiep giu nguyen.
const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const SITE_URL = "https://chonquachuan.vn";
const SITE_TITLE = "Chọn Quà Chuẩn — Tìm quà tặng phù hợp, nhanh và ý nghĩa";
const SITE_DESCRIPTION =
  "Chọn Quà Chuẩn giúp doanh nghiệp và cá nhân tìm quà tặng phù hợp — quà tri ân đối tác, quà cá nhân, set quà handmade, và quà tặng số.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Chọn Quà Chuẩn",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "quà tặng doanh nghiệp",
    "quà tri ân đối tác",
    "quà tặng cá nhân",
    "set quà handmade",
    "quà tặng số",
    "tìm quà tặng",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "msvalidate.01": "486B6DBD9D39EA3636BB7C01F5F4E273",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Chọn Quà Chuẩn",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-sen.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-sen.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Chọn Quà Chuẩn",
  legalName: "Công ty TNHH Nguyên Khánh Vina",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  taxID: "0319221275",
  email: "lienhe@chonquachuan.vn",
  telephone: "+84827288286",
  contactPoint: {
    "@type": "ContactPoint",
    email: "lienhe@chonquachuan.vn",
    telephone: "+84827288286",
    contactType: "customer service",
    availableLanguage: "Vietnamese",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "244/29 Huỳnh Văn Bánh",
    addressLocality: "Phường Phú Nhuận",
    addressRegion: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Chọn Quà Chuẩn",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${tieuDe.variable} ${lora.variable} ${chuThuong.variable}`}>
      <body className="font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
