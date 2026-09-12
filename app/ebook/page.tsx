import { redirect } from "next/navigation";
import { EBOOKS } from "@/lib/ebook";

// /ebook không có nội dung riêng: chuyển thẳng tới trang của cuốn nổi bật
// (EBOOKS[0]) để thanh địa chỉ hiện tên sách. Link /ebook đã chia sẻ trước
// đây vẫn mở được.
// Phải dựng động: nếu để trang tĩnh, Next trả 307 KHÔNG kèm header Location
// (chỉ chuyển bằng JavaScript) — Zalo/Facebook xem trước link sẽ ra trang lỗi.
export const dynamic = "force-dynamic";

export default function EbookPage() {
  redirect(EBOOKS[0].href);
}
