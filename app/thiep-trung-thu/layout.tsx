import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gửi thiệp Trung Thu miễn phí",
  description:
    "Tạo thiệp Trung Thu có tên riêng để gửi tặng người thân, bạn bè hoặc đối tác — miễn phí, chỉ mất 30 giây, từ Chọn Quà Chuẩn.",
  alternates: { canonical: "/thiep-trung-thu" },
};

export default function ThiepTrungThuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
