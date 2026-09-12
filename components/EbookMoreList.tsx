import Link from "next/link";
import Image from "next/image";
import { EBOOKS } from "@/lib/ebook";

// Danh sach "Ebook khac" hien ben canh khung doc (vung trong truoc day) —
// giup nguoi xem biet con ebook nao khac de doc tiep. Tu dong liet ke moi
// EBOOKS[] tru cuon dang xem, khong can sua gi khi them ebook moi.
// Chi hien tren man hinh rat rong (2xl, tu 1536px+) noi con du cho trong
// ben canh khung doc ma khong bi tran; an tren man hinh nho/trung binh de
// khong choat cho hay gay cuon ngang.
type Props = {
  currentId: string;
  className?: string;
};

export default function EbookMoreList({ currentId, className = "" }: Props) {
  const others = EBOOKS.filter((b) => b.id !== currentId);
  if (others.length === 0) return null;

  return (
    <div
      className={`hidden 2xl:flex w-[200px] shrink-0 flex-col gap-4 ${className}`}
    >
      <span className="text-ink-soft text-[12px] font-semibold tracking-wide uppercase">
        Ebook khác
      </span>
      <div className="flex flex-col gap-3">
        {others.map((book) => (
          <Link
            key={book.id}
            href={book.href}
            className="group flex flex-col gap-2 rounded-lg border border-line bg-surface-2 p-2.5 transition-colors hover:border-ink-soft"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold leading-snug line-clamp-2">
                {book.title}
              </span>
              <span className="text-ink-soft text-[12px]">Đọc ngay →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
