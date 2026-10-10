import { type DongGia, tietKiem, vnd } from "@/lib/lichTet";

// Bảng giá lịch Tết: mỗi dòng = tên + giá Chọn Quà Chuẩn (đỏ, đậm) + giá bìa (chữ thường, KHÔNG gạch ngang —
// chị Nga dặn 10/10/2026) và nhãn "Tiết kiệm x%" (chị: giá bìa = giá thị trường, % = khách được ưu đãi).
// Dạng thẻ dọc (không phải bảng nhiều cột) để điện thoại đọc được mà không phải kéo ngang.
export default function BangGiaLich({ dong, tieuDe }: { dong: DongGia[]; tieuDe?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      {tieuDe && (
        <div className="px-4 py-3 md:px-5 bg-[#C8102E] text-white font-bold text-[15px] md:text-[16px]">{tieuDe}</div>
      )}
      <ul className="divide-y divide-line">
        {dong.map((g) => (
          <li key={g.ten} className="px-4 py-3 md:px-5 flex items-center justify-between gap-3">
            <span className="min-w-0 text-[14.5px] md:text-[15.5px] leading-snug">{g.ten}</span>
            <span className="flex flex-col items-end shrink-0">
              <b className="text-[17px] md:text-[18px] text-[#C8102E] whitespace-nowrap">{vnd(g.gia)}</b>
              {g.giaBia && (
                <span className="flex items-center gap-1.5 text-[12.5px] text-ink-soft whitespace-nowrap">
                  <span>Giá bìa {vnd(g.giaBia)}</span>
                  <span className="rounded-full bg-[#FFD84D] px-1.5 py-px font-bold text-[#7A1F0A]">
                    Tiết kiệm {tietKiem(g)}%
                  </span>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
