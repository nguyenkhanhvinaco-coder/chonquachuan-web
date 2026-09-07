import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon, GiftIcon, FacebookIcon, ZaloIcon } from "@/components/icons";
import InlineLeadForm from "@/components/InlineLeadForm";
import LeadFormTrigger from "@/components/LeadForm";
import { getFeaturedProducts } from "@/lib/products";
import { ZALO_URL, FANPAGE_URL } from "@/lib/contact";

// Cho phep trang lam moi du lieu san pham (tu Supabase) toi da moi 60 giay
// mot lan, thay vi dong bang vinh vien luc build - de sua san pham truc
// tiep trong Supabase Table Editor (khong dong code) len trang that trong
// vong ~1 phut, khong can cho deploy lai.
export const revalidate = 60;

export default async function HomePage() {
  // San pham chinh can day sales, hien ngay khi mo trang (khu tren cung) -
  // doi ID o day khi doi san pham can day manh, khong phai dung code khac.
  const [mainProduct] = await getFeaturedProducts();

  return (
    <div className="flex flex-col">
      <Header />

      {/* San pham noi bat — vi tri tren cung, thay cho banner Thiep tranh ve
          cu (2026-09: doi cho theo yeu cau, mo trang phai thay san pham can
          day sales ngay lap tuc). Thiep tranh ve chuyen xuong khu the nho o
          Hero ben duoi, video chuyen len khu the lon. */}
      {mainProduct && (
        <section style={{ background: "linear-gradient(135deg, #8ED1FC 0%, #1E88E5 100%)" }}>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14 px-9 py-12 md:px-[72px] md:py-16">
            <div className="flex-1 flex flex-col gap-3.5 items-center md:items-start text-center md:text-left max-w-[460px]">
              <span className="inline-flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full text-[13px] font-bold text-[#1A1006]">
                🔥 Sản phẩm nổi bật
              </span>
              <h2 className="font-serif font-bold text-[24px] md:text-[36px] leading-[1.2] text-[#DC2626]">
                {mainProduct.name}
              </h2>
              <p className="text-[15px] leading-relaxed max-w-[420px] font-semibold text-[#3A2410]">
                {mainProduct.description}
              </p>
              <span className="text-xl font-extrabold text-[#1A1006]">{mainProduct.price_display}</span>
              <div className="flex flex-wrap gap-3 mt-1.5 justify-center md:justify-start">
                <Link
                  href={`/san-pham/${mainProduct.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold bg-[#1A1006] text-white"
                >
                  Xem chi tiết
                  <ArrowRightIcon size={16} color="currentColor" />
                </Link>
                <LeadFormTrigger
                  productId={mainProduct.id}
                  productLabel={`${mainProduct.name} · ${mainProduct.price_display}`}
                  triggerLabel="Nhận tư vấn ngay"
                  source="trang-chu-spotlight"
                  triggerClassName="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold border-2 border-[#1A1006] text-[#1A1006] bg-white/70"
                />
              </div>
            </div>
            <Link
              href={`/san-pham/${mainProduct.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-1 w-full max-w-[520px] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg flex items-center justify-center"
              style={{ background: mainProduct.color }}
            >
              {mainProduct.image ? (
                // object-contain: anh co logo/QR in san o goc, khong duoc cat.
                <Image
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <GiftIcon size={64} color="white" strokeWidth={1.3} />
              )}
            </Link>
          </div>
        </section>
      )}

      {/* Hero — don gian hoa 2026-09: bo bang hoi /tim-qua va luoi danh muc,
          thay bang form de lai thong tin hien truc tiep tren trang (khong
          qua modal). Khu the ben phai: video gioi thieu (o lon) + Thiep
          tranh ve mien phi (o nho) — san pham that da chuyen len khu Noi
          bat rieng phia tren. */}
      <section className="flex flex-col md:flex-row items-center gap-16 px-9 py-16 md:px-[72px] md:py-[88px]">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex self-start bg-accent-soft px-3.5 py-1.5 rounded-full text-[13px] font-semibold" style={{ color: "oklch(0.45 0.14 40)" }}>
            Dành cho doanh nghiệp &amp; cá nhân
          </div>
          <h1 className="font-serif leading-[1.16] max-w-[480px]">
            <span className="block text-[38px] md:text-[52px]">Chọn Quà Chuẩn</span>
            <span className="block text-[20px] md:text-[26px] mt-1.5 text-ink-soft font-normal">
              — tư vấn và cung cấp quà tặng cho doanh nghiệp và cá nhân.
            </span>
          </h1>
          <p className="text-[13px] leading-relaxed text-ink-soft max-w-[480px]">
            Để lại thông tin, chúng tôi liên hệ tư vấn ngay set quà phù hợp — từ quà tri ân đối tác
            đến quà tặng người thân, gồm cả quà vật lý thủ công lẫn quà tặng số nhận ngay tức thì.
          </p>
          <div className="mt-2 max-w-[420px] flex flex-col gap-4">
            <InlineLeadForm />
            <div className="flex flex-col gap-2.5">
              <span className="text-[12.5px] font-semibold text-ink-soft">Hoặc liên hệ trực tiếp</span>
              <div className="flex gap-3">
                <a
                  href={FANPAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-line rounded-[10px] py-3 text-[14px] font-semibold min-h-[44px]"
                >
                  <FacebookIcon size={20} />
                  Fanpage
                </a>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-line rounded-[10px] py-3 text-[14px] font-semibold min-h-[44px]"
                >
                  <ZaloIcon size={20} />
                  Zalo OA
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile (1 cot): thiep xep truoc, video xep sau, moi khoi full-width,
            khong chong lan nhau. Desktop (md: 2 cot): video lon ben trai
            (chiem 2 hang), thiep nho tren-phai - dung "order" de doi thu tu
            hien thi giua 2 kich thuoc man hinh ma khong doi thu tu code. */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* O lon: video gioi thieu (truoc o day la anh san pham, san pham
              da chuyen len khu Noi bat phia tren). */}
          <div className="relative rounded-[20px] overflow-hidden order-2 md:order-1 md:row-span-2 min-h-[240px] md:min-h-[420px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/gioi-thieu-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/gioi-thieu.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Cot nho: Thiep tranh ve mien phi + dai 3 anh tranh mau ben duoi
              (lap khoang trong o duoi the thiep tren desktop - the thiep
              chi cao ~200px trong khi video ben trai cao 420px). */}
          <div className="order-1 md:order-2 flex flex-col gap-5">
            <Link
              href="/thiep-mien-phi"
              className="relative rounded-[20px] flex overflow-hidden min-h-[200px]"
              style={{ background: "linear-gradient(135deg, #F8E4C6, #F2CFA0)" }}
            >
              <Image
                src="/trung-thu/co-tien.jpg"
                alt="Thiệp tranh vẽ của bé"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(20,15,10,0.72) 0%, rgba(20,15,10,0.15) 55%, rgba(20,15,10,0) 75%)" }}
              />
              <span className="relative z-10 flex flex-col justify-end w-full rounded-[20px] p-6">
                <span className="text-[11.5px] font-bold text-white/80 uppercase tracking-wide">
                  Miễn phí
                </span>
                <span className="font-serif font-semibold text-white text-base mt-2.5">
                  Thiệp tranh vẽ của bé
                </span>
                <span className="text-sm mt-1.5 text-white/85">Gửi tặng bạn miễn phí →</span>
              </span>
            </Link>

            <Link
              href="/thiep-mien-phi"
              className="grid grid-cols-3 gap-3 flex-1 min-h-[130px] md:min-h-[190px]"
            >
              {[
                { src: "/trung-thu/ca-koi.jpg", alt: "Tranh Cá Koi May Mắn" },
                { src: "/trung-thu/dan-meo.jpg", alt: "Tranh Đàn Mèo" },
                { src: "/trung-thu/quoc-khanh.jpg", alt: "Tranh Diễu Hành Mừng Quốc Khánh" },
              ].map((img) => (
                <div key={img.src} className="relative rounded-xl overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cach-hoat-dong" className="px-9 py-20 md:px-[72px] flex flex-col gap-11">
        <h2 className="font-serif text-[28px] text-center">
          Chỉ 3 bước để tìm được món quà phù hợp
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: 1, title: "Để lại thông tin", desc: "Cho biết bạn cần quà cho dịp gì, ngân sách khoảng bao nhiêu." },
            { n: 2, title: "Chúng tôi liên hệ tư vấn", desc: "Gọi hoặc nhắn Zalo trong thời gian sớm nhất, gợi ý set quà phù hợp nhất." },
            { n: 3, title: "Chọn và nhận quà", desc: "Chọn set quà ưng ý, chúng tôi lo phần còn lại đến khi bạn nhận quà." },
          ].map((s) => (
            <div key={s.n} className="flex flex-col gap-3">
              <div
                className="w-11 h-11 rounded-full bg-accent-soft flex items-center justify-center font-serif font-bold text-lg"
                style={{ color: "oklch(0.45 0.14 40)" }}
              >
                {s.n}
              </div>
              <h3 className="text-lg">{s.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supplier CTA */}
      <section id="nha-cung-cap" className="mx-9 mb-20 md:mx-[72px] bg-ink rounded-[20px] p-8 md:p-11 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-bg text-xl">Bạn là nhà sản xuất hoặc kinh doanh quà tặng?</h3>
          <p className="text-sm" style={{ color: "oklch(0.75 0.02 60)" }}>
            Đăng ký làm nhà cung cấp, nhận đơn hàng phù hợp với sản phẩm của bạn.
          </p>
        </div>
        <a
          href="mailto:lienhe@chonquachuan.vn?subject=Đăng ký nhà cung cấp Chọn Quà Chuẩn"
          className="flex-shrink-0 bg-bg text-ink rounded-[10px] px-[26px] py-3.5 text-[15px] font-semibold"
        >
          Trở thành đối tác với Chọn Quà Chuẩn
        </a>
      </section>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
            Liên hệ
          </Link>
          <Link href="/chinh-sach-du-lieu-ca-nhan" className="text-ink-soft text-[13px] font-medium">
            Chính sách dữ liệu cá nhân
          </Link>
          <span className="text-ink-soft text-[13px]">© 2026 Nguyên Khánh Vina · chonquachuan.vn</span>
        </div>
      </footer>
    </div>
  );
}
