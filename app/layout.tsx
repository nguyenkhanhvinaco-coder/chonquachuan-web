import type { Metadata } from "next";
import { Lora, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
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
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  email: "nguyenkhanhvina.co@gmail.com",
  telephone: "+84827288286",
  contactPoint: {
    "@type": "ContactPoint",
    email: "nguyenkhanhvina.co@gmail.com",
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
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
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
