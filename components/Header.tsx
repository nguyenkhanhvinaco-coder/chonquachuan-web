import Link from "next/link";
import Image from "next/image";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
      <Image
        src="/logo-icon.png"
        alt="Chọn Quà Chuẩn"
        width={48}
        height={48}
        className="w-9 h-9 sm:w-12 sm:h-12 flex-shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span className="font-serif font-bold text-[15px] sm:text-lg leading-tight truncate">
          Chọn Quà Chuẩn
        </span>
        <span className="text-[8.5px] sm:text-[10px] font-semibold tracking-wide text-ink-soft leading-tight whitespace-nowrap">
          SÁNG TẠO - TRAO GIÁ TRỊ
        </span>
      </div>
    </Link>
  );
}

export default function Header({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <header className="flex items-center justify-between px-3 sm:px-9 md:px-[72px] py-3 sm:py-6 border-b border-line gap-3">
        <Brand />
        <Link href="/" className="text-ink-soft text-sm flex-shrink-0">
          Thoát
        </Link>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-3 sm:px-9 md:px-[72px] py-3 sm:py-6 border-b border-line gap-2">
      <Brand />
      <nav className="flex items-center gap-3 md:gap-8 flex-shrink-0">
        <Link href="/danh-muc" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Danh mục
        </Link>
        <Link href="/#cach-hoat-dong" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Cách hoạt động
        </Link>
        <Link href="/#nha-cung-cap" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Trở thành nhà cung cấp
        </Link>
        {/* Giỏ hàng đã gỡ khỏi header: website chưa có giỏ hàng/thanh toán thật,
            biểu tượng giỏ kèm số 0 khiến khách tưởng có mà bấm vào không làm gì.
            Gắn lại khi làm xong luồng mua hàng — CartIcon vẫn còn trong icons.tsx. */}
        <Link
          href="/tim-qua"
          className="bg-accent text-accent-ink rounded-lg px-2.5 py-1.5 text-[11px] sm:px-6 sm:py-3 sm:text-[15px] font-semibold whitespace-nowrap flex-shrink-0"
        >
          Tìm quà ngay
        </Link>
      </nav>
    </header>
  );
}
