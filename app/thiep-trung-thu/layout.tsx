import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiệp Trung Thu — Tranh Thật Của Bé",
  description:
    "Chọn 1 trong 7 bức tranh Trung Thu do chính con gái nhà sáng lập Chọn Quà Chuẩn vẽ, gửi tặng người thân qua Zalo — miễn phí, chỉ mất 30 giây.",
  alternates: { canonical: "/thiep-trung-thu" },
};

export default function ThiepTrungThuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
