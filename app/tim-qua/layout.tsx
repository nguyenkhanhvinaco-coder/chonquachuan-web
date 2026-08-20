import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm quà tặng phù hợp",
  description:
    "Trả lời vài câu hỏi nhanh để Chọn Quà Chuẩn gợi ý set quà phù hợp nhất cho đối tượng, dịp tặng và ngân sách của bạn.",
  alternates: { canonical: "/tim-qua" },
};

export default function TimQuaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
