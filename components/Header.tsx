import Link from "next/link";
import { GiftIcon, CartIcon } from "./icons";

export default function Header({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <header className="flex items-center justify-between px-9 py-6 border-b border-line md:px-[72px]">
        <Link href="/" className="flex items-center gap-2.5">
          <GiftIcon size={26} color="var(--accent)" strokeWidth={1.8} />
          <span className="font-serif font-bold text-lg">Chọn Quà Chuẩn</span>
        </Link>
        <Link href="/" className="text-ink-soft text-sm">
          Thoát
        </Link>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-9 py-6 border-b border-line md:px-[72px]">
      <Link href="/" className="flex items-center gap-2.5">
        <GiftIcon size={26} color="var(--accent)" strokeWidth={1.8} />
        <span className="font-serif font-bold text-lg">Chọn Quà Chuẩn</span>
      </Link>
      <nav className="flex items-center gap-8">
        <Link href="/danh-muc" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Danh mục
        </Link>
        <Link href="/#cach-hoat-dong" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Cách hoạt động
        </Link>
        <Link href="/#nha-cung-cap" className="text-ink-soft text-[15px] font-medium hidden md:inline">
          Trở thành nhà cung cấp
        </Link>
        <div className="relative flex items-center">
          <CartIcon size={22} color="var(--ink)" />
          <span className="absolute -top-2 -right-2.5 bg-accent text-accent-ink text-[10.5px] font-bold rounded-full w-[17px] h-[17px] flex items-center justify-center">
            0
          </span>
        </div>
        <Link
          href="/tim-qua"
          className="bg-accent text-accent-ink rounded-lg px-6 py-3 text-[15px] font-semibold"
        >
          Tìm quà ngay
        </Link>
      </nav>
    </header>
  );
}
