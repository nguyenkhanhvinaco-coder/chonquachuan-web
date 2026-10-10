import { ZaloIcon } from "@/components/icons";
import { ZALO_URL, HOTLINE, HOTLINE_TEL } from "@/lib/contact";

// Khối nổi bật "Thiết kế lịch Tết & bao lì xì ĐỘC QUYỀN" (chị Nga thêm 10/10/2026).
// Hạn nhận đơn độc quyền: trước 10/11/2026 — SAU NGÀY NÀY gỡ khối (xoá các chỗ dùng <BannerDocQuyen />)
// hoặc sửa HAN_CHOT. Nền tím để khác màu đỏ của bài Quà Tết và các bảng giá.
export const HAN_CHOT = "10/11/2026";

export default function BannerDocQuyen({ gon = false }: { gon?: boolean }) {
  return (
    <aside
      className={`rounded-[20px] text-white flex flex-col gap-3 md:flex-row md:items-center md:justify-between ${
        gon ? "p-5" : "p-6 md:p-8"
      }`}
      style={{ background: "linear-gradient(135deg, #3B0A75 0%, #6D28D9 60%, #8B5CF6 100%)" }}
    >
      <div className="flex flex-col gap-2 min-w-0">
        <span className="inline-flex self-start items-center rounded-full bg-[#FFD84D] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#3B0A75]">
          Độc quyền cho doanh nghiệp
        </span>
        <h2 className={`font-serif leading-snug ${gon ? "text-[20px] md:text-[22px]" : "text-[22px] md:text-[28px]"}`}>
          Thiết kế lịch Tết &amp; bao lì xì độc quyền mang dấu ấn riêng của doanh nghiệp
        </h2>
        {!gon && (
          <p className="text-[14.5px] md:text-[15.5px] leading-relaxed text-white/90 max-w-[760px]">
            Ngoài các mẫu có sẵn, Chọn Quà Chuẩn (Công ty TNHH Nguyên Khánh Vina) nhận thiết kế và sản xuất lịch Tết,
            bao lì xì theo hình ảnh, màu sắc nhận diện và sản phẩm của chính doanh nghiệp — không trùng với mẫu bán sẵn
            trên thị trường.
          </p>
        )}
        <p className="text-[15px] md:text-[16px] font-bold text-[#FFD84D]">
          Nhận đơn làm độc quyền trước ngày {HAN_CHOT}.
        </p>
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[15px] font-bold bg-[#FFD84D] !text-[#3B0A75] min-h-[44px]"
        >
          <ZaloIcon size={20} />
          Đặt thiết kế độc quyền
        </a>
        <a href={`tel:${HOTLINE_TEL}`} className="text-center text-[13.5px] !text-white/90">
          Hotline {HOTLINE}
        </a>
      </div>
    </aside>
  );
}
