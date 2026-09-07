import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon, GiftIcon, FacebookIcon, ZaloIcon } from "@/components/icons";
import InlineLeadForm from "@/components/InlineLeadForm";
import { getFeaturedProducts } from "@/lib/products";
import { ZALO_URL, FANPAGE_URL } from "@/lib/contact";

// Cho phep trang lam moi du lieu san pham (tu Supabase) toi da moi 60 giay
// mot lan, thay vi dong bang vinh vien luc build - de sua san pham truc
// tiep trong Supabase Table Editor (khong dong code) len trang that trong
// vong ~1 phut, khong can cho deploy lai.
export const revalidate = 60;

export default async function HomePage() {
  // Chi lay 2 san pham dau lam vi du tuong trung (1 huong ca nhan, 1 huong
  // doanh nghiep) - trang chu khong con la catalog day du nua, xem ghi chu
  // o phan Hero ben duoi.
  const examples = (await getFeaturedProducts()).slice(0, 2);

  return (
    <div className="flex flex-col">
      <Header />

      {/* Seasonal promo — Trung Thu */}
      <section style={{ background: "linear-gradient(135deg, #F8E4C6, #F2CFA0)" }}>
        <Link
          href="/thiep-mien-phi"
          className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 px-9 py-12 md:px-[72px] md:py-14"
        >
          <div className="flex-1 flex flex-col gap-3.5 items-center md:items-start text-center md:text-left max-w-[440px]">
            <span
              className="inline-flex items-center gap-1.5 bg-white/70 px-3.5 py-1.5 rounded-full text-[13px] font-semibold"
              style={{ color: "#B3441F" }}
            >
              🎁 Thiệp tranh vẽ tặng miễn phí
            </span>
            <h2 className="font-serif text-[22px] md:text-[36px] leading-[1.2]" style={{ color: "#3A2A1D" }}>
              Thiệp tranh vẽ của bé.
              <br />
              Gửi tặng bạn miễn phí.
            </h2>
            <p className="text-[15px] leading-relaxed max-w-[420px]" style={{ color: "#6B5643" }}>
              Chọn 1 trong 15 bức tranh thật do một bạn nhỏ vẽ tay, thêm lời chúc, gửi ngay cho
              người thân — không mất phí, không cần đăng ký.
            </p>
            <span
              className="inline-flex items-center gap-2 w-fit rounded-[10px] px-6 py-3.5 text-[15px] font-bold mt-1.5"
              style={{ background: "#16A34A", color: "#FFFFFF", boxShadow: "0 6px 20px rgba(22,163,74,0.45)" }}
            >
              Bấm để tạo thiệp
              <ArrowRightIcon size={16} color="#FFFFFF" />
            </span>
          </div>
          <div className="hidden md:block flex-1 h-[240px] rounded-2xl overflow-hidden border-4 border-white shadow-lg">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/videos/gioi-thieu-poster.jpg"
              className="w-full h-full object-cover"
            >
              <source src="/videos/gioi-thieu.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative w-full max-w-[300px] h-[190px] md:h-[240px] md:max-w-[340px] shrink-0">
            <div className="absolute left-[6%] top-[8%] w-[52%] aspect-[3/4] rotate-[-7deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image src="/trung-thu/co-tien.jpg" alt="Tranh Cô Tiên Đêm Sao" fill sizes="200px" className="object-cover" />
            </div>
            <div className="absolute right-[4%] top-0 w-[46%] aspect-[3/4] rotate-[6deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image src="/trung-thu/ca-koi.jpg" alt="Tranh Cá Koi May Mắn" fill sizes="180px" className="object-cover" />
            </div>
            <div className="absolute left-[26%] bottom-0 w-[48%] aspect-[3/4] rotate-[3deg] rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <Image src="/trung-thu/quoc-khanh.jpg" alt="Tranh Diễu Hành Mừng Quốc Khánh" fill sizes="190px" className="object-cover" />
            </div>
          </div>
        </Link>
      </section>

      {/* Hero — don gian hoa 2026-09: bo bang hoi /tim-qua va luoi danh muc,
          thay bang form de lai thong tin hien truc tiep tren trang (khong
          qua modal) + 2 san pham vi du tuong trung (khong phai catalog day
          du, tranh lo thiet ke cho doi thu sao chep). */}
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
        <div className="flex-1 grid grid-cols-2 gap-5 w-full">
          {examples.map((g, i) => {
            const isHero = i === 0;
            const audienceTag = i === 0 ? "Cho cá nhân" : "Cho doanh nghiệp";
            return (
              <div
                key={g.id}
                className={`rounded-[20px] flex overflow-hidden ${
                  isHero ? "row-span-2 min-h-[420px]" : "min-h-[200px]"
                }`}
              >
                <span
                  className={`flex flex-col justify-end w-full rounded-[20px] ${
                    isHero ? "p-7" : "p-6"
                  }`}
                  style={{ background: g.color }}
                >
                  <span className="text-[11.5px] font-bold text-white/80 uppercase tracking-wide">
                    {audienceTag} · Ví dụ
                  </span>
                  <GiftIcon
                    size={isHero ? 46 : 34}
                    color="white"
                    strokeWidth={isHero ? 1.5 : 1.6}
                  />
                  <span
                    className={`font-serif font-semibold text-white ${
                      isHero ? "text-xl mt-4" : "text-base mt-2.5"
                    }`}
                  >
                    {g.name}
                  </span>
                  <span className="text-sm mt-1.5 text-white/85">{g.price_display}</span>
                </span>
              </div>
            );
          })}
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
