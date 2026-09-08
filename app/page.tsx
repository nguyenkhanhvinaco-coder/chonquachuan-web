import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon, GiftIcon, FacebookIcon, ZaloIcon } from "@/components/icons";
import InlineLeadForm from "@/components/InlineLeadForm";
import LeadFormTrigger from "@/components/LeadForm";
import EbookCoverCard from "@/components/EbookCoverCard";
import { getFeaturedProducts } from "@/lib/products";
import { EBOOKS } from "@/lib/ebook";
import { ZALO_URL, FANPAGE_URL } from "@/lib/contact";

// Cho phep trang lam moi du lieu san pham (tu Supabase) toi da moi 60 giay
// mot lan, thay vi dong bang vinh vien luc build - de sua san pham truc
// tiep trong Supabase Table Editor (khong dong code) len trang that trong
// vong ~1 phut, khong can cho deploy lai.
export const revalidate = 60;

export default async function HomePage() {
  // Khu "San pham noi bat" o dau trang: hai san pham ghim dau trong
  // FEATURED_IDS (sua danh sach do trong lib/products.ts khi doi san pham can
  // day manh) + mot o Ebook. Ebook KHONG nam trong bang products ma o
  // lib/ebook.ts, nen gop lai thanh mot mang `tiles` de ca ba o dung chung
  // mot khuon hien thi, khong the lech nhau.
  const [mainProduct, secondProduct] = await getFeaturedProducts();
  const ebook = EBOOKS[0];

  const tiles = [
    ...[mainProduct, secondProduct]
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({
        key: p.id,
        href: `/san-pham/${p.id}`,
        image: p.image,
        name: p.name,
        bg: p.color,
      })),
    ...(ebook
      ? [
          {
            key: ebook.id,
            href: ebook.href,
            image: ebook.cover,
            name: ebook.title,
            bg: "#EFE3CE",
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col">
      <Header />

      {/* San pham noi bat — vi tri tren cung, thay cho banner Thiep tranh ve
          cu (2026-09: doi cho theo yeu cau, mo trang phai thay san pham can
          day sales ngay lap tuc). Thiep tranh ve chuyen xuong khu the nho o
          Hero ben duoi, video chuyen len khu the lon. */}
      {mainProduct && (
        <section style={{ background: "linear-gradient(135deg, #E3F3FF 0%, #A8D8F8 100%)" }}>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 px-9 pt-8 pb-10 md:px-[72px] md:pt-10 md:pb-12">
            {/* Cot trai: phan gioi thieu thuong hieu da CHUYEN TU KHU HERO ben
                duoi len day (yeu cau 2026-09-08) - truoc do cot nay chi co
                nhan + nut nen trong hoac, con phan gioi thieu lai nam mai
                phia duoi. Gop len giup trang can doi va nguoi moi vao hieu
                ngay Chon Qua Chuan lam gi.

                Ten + mo ta san pham khong dat o day: da nam duoi tung khung
                anh ben phai roi. Nhan "San pham noi bat" co nhip dap nhe
                (.badge-noi-bat trong globals.css). */}
            <div className="flex-1 flex flex-col gap-4 items-center md:items-start text-center md:text-left max-w-[450px]">
              <div className="inline-flex bg-white/75 px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#8A3A12]">
                Dành cho doanh nghiệp &amp; cá nhân
              </div>
              <h1 className="font-serif leading-[1.16] text-[#1A1006]">
                <span className="block text-[32px] md:text-[44px]">Chọn Quà Chuẩn</span>
                <span className="block text-[17px] md:text-[21px] mt-1.5 font-normal text-[#3A2410]">
                  — tư vấn và cung cấp quà tặng ĐỘC QUYỀN cho doanh nghiệp và cá nhân.
                </span>
              </h1>
              <p className="text-[13px] leading-relaxed text-[#3A2410]">
                Để lại thông tin, chúng tôi liên hệ tư vấn ngay set quà phù hợp — từ quà tri ân đối
                tác đến quà tặng người thân, gồm cả quà vật lý thủ công lẫn quà tặng số nhận ngay
                tức thì.
              </p>
              <span className="badge-noi-bat inline-flex items-center gap-2 bg-white px-5 py-3 rounded-full text-[17px] md:text-[20px] font-extrabold text-[#DC2626] shadow-md mt-1">
                🔥 Sản phẩm nổi bật
              </span>
              <LeadFormTrigger
                productId="trang-chu-noi-bat"
                productLabel="Sản phẩm nổi bật (trang chủ)"
                triggerLabel="Nhận tư vấn ngay"
                source="trang-chu-spotlight"
                triggerClassName="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold border-2 border-[#1A1006] text-[#1A1006] bg-white/70"
              />
            </div>
            {/* Ba o: 2 san pham ghim + Ebook. Tat ca deu HIEN tren dien thoai
                (yeu cau 2026-09-08) - dung 2 cot o mobile cho de doc, o thu ba
                xuong hang duoi; 3 cot tu man hinh md tro len. Neu ep 3 cot o
                mobile thi moi o chi con ~100px, nut "Xem chi tiet" bi vo chu.

                Ca ba dung CHUNG mot khuon (anh ti le 4/3 → ten → nut) nen
                khong the lech nhau. Khong hien gia o day - gia nam o trang
                chi tiet san pham. */}
            {/* items-stretch (mac dinh) + h-full o tung the: ba o BANG chieu
                cao nhau nen nut "Xem chi tiet" thang hang, du ten san pham dai
                ngan khac nhau. Truoc dung items-start nen o nao ten ngan thi
                nut bi day len cao hon hai o kia. */}
            <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {tiles.map((t, i) => (
                <Link
                  key={t.key}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white flex flex-col"
                >
                  <span className="relative block aspect-[4/3]" style={{ background: t.bg }}>
                    {/* object-contain: anh san pham co logo/QR in san o goc,
                        doi sang object-cover la cat mat. */}
                    {t.image ? (
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 24vw"
                        className="object-contain"
                        priority={i === 0}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <GiftIcon size={40} color="white" strokeWidth={1.3} />
                      </span>
                    )}
                  </span>
                  <span className="flex flex-col gap-2 px-2.5 py-2.5 md:px-3 md:py-3 flex-1">
                    <span className="text-[13.5px] md:text-[16.5px] font-bold leading-snug text-[#DC2626] flex-1">
                      {t.name}
                    </span>
                    {/* whitespace-nowrap + dem ngang hep o mobile: cot chi rong
                        ~140px tren dien thoai, de mac dinh thi chu nut vo lam
                        hai dong ("Xem chi" / "tiet"). */}
                    <span className="inline-flex items-center justify-center gap-1 md:gap-1.5 whitespace-nowrap rounded-[10px] px-2 md:px-3 py-2.5 md:py-3 text-[13px] md:text-[16px] font-bold bg-[#FFC633] text-[#1A1006]">
                      Xem chi tiết
                      <ArrowRightIcon size={15} color="currentColor" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
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
          {/* Phan gioi thieu thuong hieu (nhan + ten + mo ta) da chuyen len khu
              "San pham noi bat" phia tren (2026-09-08), o day chi con form de
              lai thong tin nen dat mot tieu de ngan cho khoi trong hoac. */}
          <h2 className="font-serif leading-[1.16] max-w-[480px]">
            <span className="block text-[28px] md:text-[38px]">Nhận tư vấn chọn quà</span>
            <span className="block text-[15px] md:text-[18px] mt-2 text-ink-soft font-normal">
              Để lại thông tin, chúng tôi liên hệ tư vấn set quà phù hợp và báo giá trong ngày.
            </span>
          </h2>
          <div className="max-w-[420px] flex flex-col gap-4">
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
        {/* Ebook luon xep dau tien (order-1) tren ca mobile lan desktop - user
            test tren dien thoai 2026-09-08 thay Ebook bi troi xuong cuoi vi
            luc do chi doi thu tu tren desktop, quen mobile van theo thu tu
            video-truoc/Ebook-sau cu. Desktop: Ebook la o lon ben trai (chiem
            2 hang, dung bia sach lam anh nen); video+thiep+anh mau xep cot
            nho ben phai, cung thu tu ben trong nhu mobile. */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* O lon: the Ebook (bia sach that, chay luan phien khi co nhieu
              cuon) - truoc day la video gioi thieu, doi cho theo yeu cau
              2026-09-08 de day manh Ebook hon. */}
          <EbookCoverCard large className="order-1 md:row-span-2" />

          {/* Cot nho: video gioi thieu + Thiep tranh ve mien phi + dai 3 anh
              tranh mau ben duoi. */}
          <div className="order-2 flex flex-col gap-5">
            <div className="relative rounded-[20px] overflow-hidden min-h-[200px]">
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
          <Link href="/chinh-sach-giao-hang" className="text-ink-soft text-[13px] font-medium">
            Chính sách giao hàng
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
