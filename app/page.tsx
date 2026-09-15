import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon, FacebookIcon, ZaloIcon } from "@/components/icons";
import InlineLeadForm from "@/components/InlineLeadForm";
import LeadFormTrigger from "@/components/LeadForm";
import BaiVietCard from "@/components/BaiVietCard";
import { getFeaturedProducts } from "@/lib/products";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { EBOOKS } from "@/lib/ebook";
import { BAI_VIET } from "@/lib/baiViet";
import { ZALO_URL, FANPAGE_URL } from "@/lib/contact";

// Cho phep trang lam moi du lieu san pham (tu Supabase) toi da moi 60 giay
// mot lan, thay vi dong bang vinh vien luc build - de sua san pham truc
// tiep trong Supabase Table Editor (khong dong code) len trang that trong
// vong ~1 phut, khong can cho deploy lai.
export const revalidate = 60;

export default async function HomePage() {
  // Khu "San pham noi bat" o dau trang: BA san pham ghim dau trong
  // FEATURED_IDS (sua danh sach do trong lib/products.ts khi doi san pham can
  // day manh). Truoc 2026-09-14 o thu ba la Ebook - theo yeu cau chi Nga,
  // Ebook bo khoi day va chi con o khu "Qua tang mien phi" ben duoi
  // (EbookCoverCard), nhuong cho cho Coc gom hoa sen ve tay.
  // 2026-09-15: cac o noi bat CHAY LUAN PHIEN (components/FeaturedCarousel.tsx)
  // theo dung thu tu FEATURED_IDS. Chi dua san pham CO anh vao vong chay - o
  // khong anh chi la khoi mau + icon, dung canh anh san pham that trong xau.
  const featured = await getFeaturedProducts(8);
  const mainProduct = featured[0];

  const coAnh = featured.filter((p) => p.image);
  const tiles = (coAnh.length >= 3 ? coAnh : featured.slice(0, 3)).map((p) => ({
    key: p.id,
    href: `/san-pham/${p.id}`,
    image: p.image,
    name: p.name,
    bg: p.color,
  }));

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
              {/* Khung vien thuoc nay truoc la nhan chu "San pham noi bat".
                  2026-09-08: user thich khung nhung bo chu, va chuyen loi vao
                  trang Danh muc xuong day - tren dien thoai link "Danh muc" o
                  header chen vao slogan lam ten thuong hieu bi cat cut. Giu
                  nguyen nhip dap (.badge-noi-bat) vi user khen dep. */}
              <Link
                href="/danh-muc"
                className="badge-noi-bat inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-[17px] md:text-[20px] font-extrabold text-[#DC2626] shadow-md mt-1"
              >
                Danh mục
                <ArrowRightIcon size={18} color="currentColor" />
              </Link>
              <LeadFormTrigger
                productId="trang-chu-noi-bat"
                productLabel="Sản phẩm nổi bật (trang chủ)"
                triggerLabel="Nhận tư vấn ngay"
                source="trang-chu-spotlight"
                triggerClassName="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold border-2 border-[#1A1006] text-[#1A1006] bg-white/70"
              />
            </div>
            {/* Cac o chay luan phien (FeaturedCarousel): 3 o/lan tu man hinh md, 2 o tren dien thoai. Tat ca deu HIEN tren dien thoai
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
            <FeaturedCarousel tiles={tiles} />
          </div>
        </section>
      )}

      {/* Hero — don gian hoa 2026-09: bo bang hoi /tim-qua va luoi danh muc,
          thay bang form de lai thong tin hien truc tiep tren trang (khong
          qua modal). Khu the ben phai: "Kien thuc chon qua" (bai viet) +
          "Qua tang mien phi" (video, thiep, bia Ebook) — san pham that da
          chuyen len khu Noi bat rieng phia tren. */}
      {/* Dien thoai (duoi md): chi Nga muon bai viet Tet len TRUOC form tu
          van, form xuong ngay duoi bai (yeu cau 2026-09-15). Vi bai viet nam
          trong luoi ben phai, luoi dung "contents" o mobile de 4 o con cua
          no thanh anh em truc tiep voi form, roi xep bang order:
          tieu de bai viet(1) -> bai viet(2) -> FORM(3) -> tieu de qua mien
          phi(4) -> qua mien phi(5). Tu md tro len luoi la grid binh thuong,
          form nam cot trai nhu cu. */}
      <section className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 px-9 py-16 md:px-[72px] md:py-[88px]">
        <div className="order-3 md:order-none mt-8 md:mt-0 flex-1 flex flex-col gap-6">
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
        {/* Sap xep lai 2026-09-15 theo anh chi Nga khoanh:
            - Cot TRAI "Kien thuc chon qua": o lon la bai viet moi nhat
              (BAI_VIET[0], lib/baiViet.ts); bai cu hon xep thanh danh sach
              duoi o do. Truoc day o lon nay la the Ebook (EbookCoverCard).
            - Cot PHAI "Qua tang mien phi": tieu de chuyen tu tren dau luoi
              sang day, roi video, thiep tranh ve, va 3 BIA EBOOK (truoc la 3
              anh tranh thiep).
            Luoi 4 o: 2 tieu de cung mot hang (desktop) nen 2 khoi ben duoi
            bat dau thang hang nhau. Mobile 1 cot theo order: tieu de bai viet
            -> bai viet -> tieu de qua mien phi -> qua mien phi. Doi order thi
            kiem ca 2 khung man hinh (bai hoc 2026-09-08: Ebook tung troi
            xuong cuoi tren dien thoai vi chi doi order o desktop).
            2 cot tu lg (1024px): o md luoi chi rong ~280px, chia 2 thi moi
            cot con ~130px. */}
        <div className="contents md:grid md:flex-1 md:w-full grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-4">
          <div id="kien-thuc-chon-qua" className="order-1 flex flex-col gap-2.5 scroll-mt-6">
            <span className="inline-flex self-start items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#B45309]">
              Kiến thức chọn quà
            </span>
            <h2 className="font-serif leading-[1.16] text-[26px] lg:text-[28px] [text-wrap:balance]">
              Bài viết &amp; kinh nghiệm
            </h2>
            <p className="text-ink-soft text-[14.5px] lg:text-[15px] leading-relaxed">
              Xu hướng quà tặng và kinh nghiệm chọn quà thực tế từ Chọn Quà Chuẩn.
            </p>
          </div>

          {/* Tieu de khu qua mien phi (them 2026-09-11, chuyen sang cot phai
              2026-09-15). [text-wrap:balance]: tieu de xuong 2 dong, khong
              chia deu thi dong 2 chi con tro chu "phi". */}
          <div className="order-4 lg:order-2 mt-8 lg:mt-0 flex flex-col gap-2.5">
            <span className="inline-flex self-start items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#15803D]">
              Quà tặng miễn phí
            </span>
            <h2 className="font-serif leading-[1.16] text-[26px] lg:text-[28px] [text-wrap:balance]">
              Ebook &amp; thiệp tranh miễn phí
            </h2>
            <p className="text-ink-soft text-[14.5px] lg:text-[15px] leading-relaxed">
              Đọc Ebook hoặc tạo thiệp tranh gửi tặng người thân — không mất phí.
            </p>
          </div>

          <div className="order-2 lg:order-3 flex flex-col gap-4">
            <BaiVietCard bai={BAI_VIET[0]} className="flex-1" />
            {BAI_VIET.length > 1 && (
              <ul className="flex flex-col divide-y divide-line border border-line rounded-2xl bg-surface">
                {BAI_VIET.slice(1, 4).map((b) => (
                  <li key={b.id}>
                    <Link
                      href={b.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 text-[14px] font-semibold"
                    >
                      {b.title}
                      <ArrowRightIcon size={15} color="currentColor" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cot qua mien phi: video gioi thieu + Thiep tranh ve + 3 bia Ebook. */}
          <div className="order-5 flex flex-col gap-5">
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

            {/* 3 bia Ebook (2026-09-15, thay cho 3 anh tranh thiep). Moi bia
                la 1 link rieng toi cuon do; bia ti le 3:4 dung khung goc nen
                khong cat. Ten sach nam duoi bia vi bia nho (~90px) va vai bia
                chi co tranh, khong co chu. Tu lay 3 cuon dau EBOOKS. */}
            <div className="flex flex-col gap-2">
              <span className="text-[12.5px] font-semibold text-ink-soft">
                Tủ Ebook miễn phí — bấm vào bìa để đọc
              </span>
              <div className="grid grid-cols-3 gap-3">
                {EBOOKS.slice(0, 3).map((b) => (
                  <Link key={b.id} href={b.href} className="flex flex-col gap-1.5">
                    <span className="relative block aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                      <Image src={b.cover} alt={b.title} fill sizes="140px" className="object-cover" />
                    </span>
                    <span className="text-[11.5px] leading-snug font-semibold text-[#1A1006] line-clamp-2">
                      {b.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
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
          {/* "Danh muc" nam o chan trang moi trang, vi da bo khoi header
              (2026-09-08) - tren dien thoai no chen vao slogan. */}
          <Link href="/danh-muc" className="text-ink-soft text-[13px] font-medium">
            Danh mục
          </Link>
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
