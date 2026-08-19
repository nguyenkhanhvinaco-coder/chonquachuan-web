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

export const metadata: Metadata = {
  title: "Chọn Quà Chuẩn — Tìm quà tặng phù hợp, nhanh và ý nghĩa",
  description:
    "Chọn Quà Chuẩn giúp doanh nghiệp và cá nhân tìm quà tặng phù hợp — quà tri ân đối tác, quà cá nhân, set quà handmade, và quà tặng số.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
