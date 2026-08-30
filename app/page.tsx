import Link from "next/link";
import Header from "@/components/Header";
import { CATEGORY_ICONS, ArrowRightIcon, GiftIcon, PersonIcon, BriefcaseIcon } from "@/components/icons";
import { categories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = (await getProducts()).slice(0, 4);

  return (
    <div className="flex flex-col">
      <Header />

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-16 px-9 py-16 md:px-[72px] md:py-[88px]">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex self-start bg-accent-soft px-3.5 py-1.5 rounded-full text-[13px] font-semibold" style={{ color: "oklch(0.45 0.14 40)" }}>
            Dành cho doanh nghiệp &amp; cá nhân
          </div>
          <h1 className="font-serif text-[38px] md:text-[52px] leading-[1.12]">
            Tìm quà chuẩn,
            <br />
            nhanh, và ý nghĩa.
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-[480px]">
            Trả lời vài câu hỏi, chúng tôi gợi ý ngay những set quà tặng phù hợp — từ quà tri ân đối
            tác đến quà tặng người thân, gồm cả quà vật lý thủ công lẫn quà tặng số (ebook, khóa học,
            file thiết kế) nhận ngay tức thì.
          </p>
          <div className="flex items-center gap-5 mt-2">
            <Link
              href="/tim-qua"
              className="bg-accent text-accent-ink rounded-[10px] px-[30px] py-4 text-base font-semibold flex items-center gap-2.5"
            >
              Bắt đầu tìm quà
              <ArrowRightIcon size={18} />
            </Link>
            <Link href="#cach-hoat-dong" className="text-[15px] font-semibold">
              Xem cách hoạt động →
            </Link>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-5 w-full">
          <div className="row-span-2 bg-accent rounded-[20px] p-7 flex flex-col justify-end min-h-[420px]">
            <GiftIcon size={46} color="var(--accent-ink)" strokeWidth={1.5} />
            <p className="text-accent-ink font-serif text-xl font-semibold mt-4">
              Set Trà Thảo Mộc Thủ Công
            </p>
            <p className="text-sm mt-1.5" style={{ color: "oklch(0.97 0.02 40)" }}>
              Handmade · Quà tri ân
            </p>
          </div>
          <div className="bg-sage-soft rounded-[20px] p-6 flex flex-col justify-end min-h-[200px]">
            <PersonIcon size={34} color="oklch(0.4 0.1 150)" strokeWidth={1.6} />
            <p className="font-serif text-base font-semibold mt-2.5">Quà cá nhân</p>
          </div>
          <div className="bg-surface-2 rounded-[20px] p-6 flex flex-col justify-end min-h-[200px]">
            <BriefcaseIcon size={34} color="var(--ink-soft)" strokeWidth={1.6} />
            <p className="font-serif text-base font-semibold mt-2.5">Quà đối tác</p>
          </div>
        </div>
      </section>

      {/* Category quick nav */}
      <section className="px-9 pb-14 md:px-[72px] flex flex-col gap-6">
        <h2 className="font-serif text-2xl">Hoặc chọn ngay theo danh mục</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon];
            return (
              <Link
                href="/danh-muc"
                key={c.label}
                className="flex flex-col items-center gap-2.5 bg-surface border border-line rounded-2xl px-3 py-5 text-center"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: c.bg }}
                >
                  <Icon size={22} color={c.fg} />
                </div>
                <span className="text-[12.5px] font-semibold">{c.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Dual audience */}
      <section className="px-9 pb-20 md:px-[72px] grid md:grid-cols-2 gap-6">
        <div className="bg-surface border border-line rounded-[20px] p-9 flex flex-col gap-3.5">
          <BriefcaseIcon size={30} color="var(--accent)" strokeWidth={1.7} />
          <h3 className="text-xl">Cho Doanh Nghiệp</h3>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            Quà tặng đối tác, tri ân khách hàng cuối năm, quà khai trương, quà sự kiện — số lượng
            lớn, đúng ngân sách, đúng thời hạn.
          </p>
        </div>
        <div className="bg-surface border border-line rounded-[20px] p-9 flex flex-col gap-3.5">
          <PersonIcon size={30} color="var(--sage)" strokeWidth={1.7} />
          <h3 className="text-xl">Cho Cá Nhân</h3>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            Quà sinh nhật, quà cho người thân, set quà handmade độc đáo — mỗi món đều có câu chuyện
            riêng.
          </p>
        </div>
      </section>

      {/* Featured gift sets */}
      <section className="px-9 pb-20 md:px-[72px] flex flex-col gap-8 bg-surface-2">
        <div className="flex items-baseline justify-between pt-14">
          <h2 className="font-serif text-[28px]">Một vài set quà nổi bật</h2>
          <Link href="/danh-muc" className="text-sm font-semibold">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pb-14">
          {products.map((g) => (
            <div key={g.id} className="bg-surface rounded-2xl overflow-hidden border border-line flex flex-col">
              <div className="h-[150px] flex items-center justify-center" style={{ background: g.color }}>
                <GiftIcon size={36} color="white" strokeWidth={1.5} />
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <p className="font-serif font-semibold text-[15px]">{g.name}</p>
                <p className="text-ink-soft text-[13px]">{g.price_display}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="cach-hoat-dong" className="px-9 py-20 md:px-[72px] flex flex-col gap-11">
        <h2 className="font-serif text-[28px] text-center">
          Chỉ 3 bước để tìm được món quà phù hợp
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: 1, title: "Điền nhu cầu", desc: "Cho biết đối tượng nhận quà, dịp tặng, ngân sách và số lượng." },
            { n: 2, title: "Nhận gợi ý phù hợp", desc: "Hệ thống đề xuất các set quà khớp với tiêu chí của bạn." },
            { n: 3, title: "Chọn & kết nối nhà cung cấp", desc: "Chúng tôi kết nối bạn với nhà cung cấp phù hợp để hoàn tất đơn." },
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
          Trở thành nhà cung cấp
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
