import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { ZALO_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Chính sách giao hàng",
  description:
    "Phạm vi giao hàng, phí vận chuyển, thời gian giao và cách xử lý hàng lỗi hoặc thiếu khi mua quà tặng tại Chọn Quà Chuẩn (Công ty TNHH Nguyên Khánh Vina).",
  alternates: { canonical: "/chinh-sach-giao-hang" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chính sách giao hàng",
      item: "https://chonquachuan.vn/chinh-sach-giao-hang",
    },
  ],
};

// Doi ngay nay moi lan sua noi dung chinh sach.
const NGAY_CAP_NHAT = "08/09/2026";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-6">
      <h2 className="font-serif text-[21px] md:text-[23px] leading-snug">{title}</h2>
      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export default function ChinhSachGiaoHangPage() {
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <div className="px-9 md:px-[72px] py-12 md:py-16 max-w-[760px] flex flex-col gap-10">
        <header className="flex flex-col gap-3">
          <h1 className="font-serif text-[30px] md:text-[38px] leading-tight">
            Chính sách giao hàng
          </h1>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            Trang này cho bạn biết Chọn Quà Chuẩn giao hàng tới đâu, phí vận chuyển tính thế nào,
            thời gian giao bao lâu, và xử lý ra sao nếu hàng nhận được bị lỗi hoặc thiếu.
          </p>
          <p className="text-ink-soft text-[13.5px]">Cập nhật lần cuối: {NGAY_CAP_NHAT}</p>
        </header>

        <Section id="ben-ban" title="1. Đơn vị chịu trách nhiệm giao hàng">
          <p>
            Thương hiệu Chọn Quà Chuẩn (chonquachuan.vn) thuộc{" "}
            <strong>Công ty TNHH Nguyên Khánh Vina</strong>.
          </p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>Mã số thuế: 0319221275</li>
            <li>Trụ sở: 244/29 Huỳnh Văn Bánh, Phường Phú Nhuận, TP. Hồ Chí Minh</li>
            <li>
              Đầu mối hỗ trợ đơn hàng:{" "}
              <a href="mailto:lienhe@chonquachuan.vn" className="font-semibold">
                lienhe@chonquachuan.vn
              </a>{" "}
              hoặc{" "}
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold">
                Zalo OA Chọn Quà Chuẩn
              </a>
            </li>
          </ul>
        </Section>

        <Section id="pham-vi" title="2. Phạm vi giao hàng">
          <p>Chúng tôi nhận giao hàng trên toàn quốc, chia làm hai khu vực:</p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              <strong>Khu vực TP. Hồ Chí Minh (theo địa giới cũ)</strong> — giao tận nơi theo địa
              chỉ bạn cung cấp.
            </li>
            <li>
              <strong>Các tỉnh thành còn lại</strong> — giao qua đơn vị vận chuyển hoặc nhà xe, tuỳ
              khối lượng và tính chất hàng hoá của từng đơn.
            </li>
          </ul>
        </Section>

        <Section id="phi-giao-hang" title="3. Phí giao hàng">
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              <strong>Miễn phí giao hàng</strong> trong khu vực TP. Hồ Chí Minh (theo địa giới cũ).
              Phí này đã nằm trong báo giá, bạn không phải trả thêm khi nhận hàng.
            </li>
            <li>
              <strong>Ngoài khu vực trên</strong>, phí vận chuyển tính theo biểu giá của đơn vị vận
              chuyển. Chúng tôi luôn báo rõ khoản phí này trong báo giá,{" "}
              <strong>trước khi bạn chốt đơn</strong> — không phát sinh chi phí nào mà bạn chưa được
              thông báo.
            </li>
          </ul>
        </Section>

        <Section id="thoi-gian" title="4. Thời gian giao hàng">
          <p>
            Thời gian giao được thoả thuận theo từng đơn hàng và ghi rõ khi chúng tôi gửi báo giá.
            Chúng tôi không áp một mốc thời gian cố định cho mọi đơn, vì thời gian thực tế phụ thuộc
            vào:
          </p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>Hàng có sẵn hay phải đặt sản xuất theo yêu cầu;</li>
            <li>Có in logo, khắc tên hay cá nhân hoá hay không — những việc này cần thời gian sản xuất riêng;</li>
            <li>Số lượng đặt và địa chỉ nhận hàng.</li>
          </ul>
          <p>
            Nếu đơn hàng của bạn gắn với một mốc thời gian bắt buộc — hội nghị, lễ tri ân, dịp lễ Tết
            — hãy báo ngay khi liên hệ để chúng tôi xác nhận có kịp hay không{" "}
            <strong>trước khi bạn đặt</strong>.
          </p>
        </Section>

        <Section id="nhan-hang" title="5. Nhận hàng và kiểm tra">
          <p>
            Bạn được mở kiểm tra hàng khi nhận: đối chiếu số lượng, mẫu mã, màu sắc và nội dung in
            logo hoặc khắc tên so với đơn đã chốt.
          </p>
          <p>
            Nếu có thể, bạn nên quay lại video lúc mở kiện hàng. Đây không phải điều kiện bắt buộc để
            được đổi hàng, nhưng khi có video thì việc xác minh và xử lý sẽ nhanh hơn nhiều, nhất là
            với đơn số lượng lớn.
          </p>
        </Section>

        <Section id="hang-loi" title="6. Hàng lỗi, thiếu hoặc hư hỏng">
          <p>
            Nếu hàng nhận được bị lỗi, thiếu số lượng, hư hỏng do vận chuyển, hoặc sai so với đơn đã
            chốt, bạn vui lòng báo cho chúng tôi{" "}
            <strong>trong vòng 7 ngày kể từ ngày nhận hàng</strong>, kèm ảnh hoặc video phần hàng có
            vấn đề.
          </p>
          <p>Sau khi xác minh, chúng tôi sẽ đổi hàng mới, bù phần hàng thiếu, hoặc thống nhất phương án xử lý khác phù hợp với bạn. Chi phí phát sinh cho phần lỗi thuộc về chúng tôi.</p>
        </Section>

        <Section id="khong-giao-duoc" title="7. Trường hợp không giao được">
          <p>
            Nếu người nhận vắng mặt, sai địa chỉ hoặc không liên lạc được, đơn vị vận chuyển sẽ liên
            hệ lại để hẹn giao lần tiếp theo. Chúng tôi sẽ báo cho bạn và cùng thống nhất phương án —
            giao lại, đổi địa chỉ, hoặc chuyển sang thời điểm khác.
          </p>
        </Section>

        <Section id="lien-he" title="8. Liên hệ về đơn hàng">
          <p>Mọi vấn đề liên quan tới giao hàng, bạn liên hệ theo một trong các kênh sau:</p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              Zalo OA:{" "}
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="font-semibold">
                Chọn Quà Chuẩn
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:lienhe@chonquachuan.vn" className="font-semibold">
                lienhe@chonquachuan.vn
              </a>
            </li>
            <li>
              Hoặc để lại thông tin ở{" "}
              <Link href="/lien-he" className="font-semibold">
                trang Liên hệ
              </Link>
              , chúng tôi gọi lại trong ngày.
            </li>
          </ul>
        </Section>
      </div>

      <footer className="px-9 py-8 md:px-[72px] border-t border-line flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif font-semibold text-[15px]">Chọn Quà Chuẩn</span>
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/danh-muc" className="text-ink-soft text-[13px] font-medium">
            Danh mục
          </Link>
          <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
            Liên hệ
          </Link>
          <Link href="/chinh-sach-du-lieu-ca-nhan" className="text-ink-soft text-[13px] font-medium">
            Chính sách dữ liệu cá nhân
          </Link>
          <span className="text-ink-soft text-[13px]">
            © 2026 Nguyên Khánh Vina · chonquachuan.vn
          </span>
        </div>
      </footer>
    </div>
  );
}
