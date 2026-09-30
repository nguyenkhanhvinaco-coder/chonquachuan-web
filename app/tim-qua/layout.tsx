import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm quà tặng phù hợp",
  description:
    "Chọn nhanh đối tượng, dịp tặng, ngân sách và để lại số điện thoại — Chọn Quà Chuẩn liên hệ gợi ý quà tặng phù hợp kèm báo giá.",
  alternates: { canonical: "/tim-qua" },
};

export default function TimQuaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
