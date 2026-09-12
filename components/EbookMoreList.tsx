import Link from "next/link";
import Image from "next/image";
import { EBOOKS } from "@/lib/ebook";

// Danh sach "Ebook khac" khi dang doc mot cuon — de nguoi doc thay con cuon
// nao khac va chon doc tiep. Tu liet ke moi EBOOKS[] tru cuon dang xem.
// Hai kieu hien, dat ca hai trong trang doc (EbookReaderPage.tsx):
// - "side": cot ben canh khung doc, chi tu man hinh xl (1280px+). O 1280px:
//   noi dung rong 1280 - 2x72 = 1136px >= cot 200 + khe 20 + khung doc 880.
// - "drop": o xo ra ngay tren khung doc, duoi xl. Dung <details open> — mo
//   san de nguoi doc thay ngay, bam tieu de de thu gon; khong can JavaScript.
type Props = {
  currentId: string;
  variant?: "side" | "drop";
  className?: string;
};

export default function EbookMoreList({ currentId, variant = "side", className = "" }: Props) {
  const others = EBOOKS.filter((b) => b.id !== currentId);
  if (others.length === 0) return null;

  if (variant === "drop") {
    return (
      <details open className={`group xl:hidden rounded-xl border border-line bg-surface-2 ${className}`}>
        <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="text-[13px] font-semibold">
            Ebook khác trong tủ sách{" "}
            <span className="text-ink-soft font-normal">· {others.length} cuốn</span>
          </span>
          <span
            className="text-ink-soft text-[12px] transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            ▾
          </span>
        </summary>
        <div className="flex gap-3 overflow-x-auto px-4 pb-4">
          {others.map((book) => (
            <Link
              key={book.id}
              href={book.href}
              className="flex items-center gap-3 shrink-0 w-[250px] rounded-lg border border-line bg-surface p-2 transition-colors hover:border-ink-soft"
            >
              <div className="relative w-[54px] aspect-[3/4] shrink-0 overflow-hidden rounded">
                <Image src={book.cover} alt={book.title} fill sizes="60px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[13px] font-semibold leading-snug line-clamp-2">{book.title}</span>
                <span className="text-ink-soft text-[12px]">Đọc ngay →</span>
              </div>
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <div className={`hidden xl:flex w-[200px] shrink-0 flex-col gap-4 ${className}`}>
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
