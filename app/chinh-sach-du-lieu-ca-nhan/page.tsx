import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";

export const metadata: Metadata = {
  title: "Chính sách bảo vệ dữ liệu cá nhân",
  description:
    "Chọn Quà Chuẩn (Công ty TNHH Nguyên Khánh Vina) thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn như thế nào — theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.",
  alternates: { canonical: "/chinh-sach-du-lieu-ca-nhan" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://chonquachuan.vn" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chính sách bảo vệ dữ liệu cá nhân",
      item: "https://chonquachuan.vn/chinh-sach-du-lieu-ca-nhan",
    },
  ],
};

// Hiển thị ngày từ chính phiên bản chính sách đang lưu cùng mỗi lượt đồng ý,
// để trang và bản ghi trong CSDL không bao giờ lệch nhau.
const [nam, thang, ngay] = PRIVACY_POLICY_VERSION.split("-");
const NGAY_CAP_NHAT = `${ngay}/${thang}/${nam}`;

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

export default function ChinhSachDuLieuCaNhanPage() {
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
            Chính sách bảo vệ dữ liệu cá nhân
          </h1>
          <p className="text-ink-soft text-[15px] leading-relaxed">
            Chính sách này cho bạn biết Chọn Quà Chuẩn thu thập những dữ liệu cá nhân nào, dùng để
            làm gì, lưu trong bao lâu, chia sẻ với ai, và bạn có những quyền gì đối với dữ liệu của
            mình.
          </p>
          <p className="text-ink-soft text-[13.5px]">
            Cập nhật lần cuối: {NGAY_CAP_NHAT} · Áp dụng theo Luật Bảo vệ dữ liệu cá nhân số
            91/2025/QH15 và Nghị định 356/2025/NĐ-CP.
          </p>
        </header>

        <Section id="ben-kiem-soat" title="1. Ai chịu trách nhiệm về dữ liệu của bạn">
          <p>
            Bên Kiểm soát dữ liệu cá nhân là <strong>Công ty TNHH Nguyên Khánh Vina</strong>, đơn vị
            sở hữu và vận hành thương hiệu Chọn Quà Chuẩn (chonquachuan.vn).
          </p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>Mã số thuế: 0319221275</li>
            <li>Trụ sở: 244/29 Huỳnh Văn Bánh, Phường Phú Nhuận, TP. Hồ Chí Minh</li>
            <li>
              Đầu mối tiếp nhận yêu cầu về dữ liệu cá nhân:{" "}
              <a href="mailto:lienhe@chonquachuan.vn" className="font-semibold">
                lienhe@chonquachuan.vn
              </a>
            </li>
          </ul>
        </Section>

        <Section id="du-lieu-thu-thap" title="2. Chúng tôi thu thập dữ liệu gì">
          <p>
            Chúng tôi chỉ thu thập những dữ liệu bạn <strong>chủ động điền vào biểu mẫu</strong> trên
            website — không thu thập ngầm, không mua dữ liệu từ bên khác.
          </p>
          <div className="border border-line rounded-xl overflow-hidden">
            <table className="w-full text-[14.5px]">
              <thead>
                <tr className="bg-surface-2 text-left">
                  <th className="px-4 py-3 font-semibold">Dữ liệu</th>
                  <th className="px-4 py-3 font-semibold">Bắt buộc?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line">
                  <td className="px-4 py-3">Họ và tên</td>
                  <td className="px-4 py-3 text-ink-soft">Bắt buộc</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="px-4 py-3">Số điện thoại</td>
                  <td className="px-4 py-3 text-ink-soft">Bắt buộc</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="px-4 py-3">Email</td>
                  <td className="px-4 py-3 text-ink-soft">Tuỳ chọn</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="px-4 py-3">Ghi chú / nội dung yêu cầu bạn tự nhập</td>
                  <td className="px-4 py-3 text-ink-soft">Tuỳ chọn</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Đây đều là <strong>dữ liệu cá nhân cơ bản</strong>. Chúng tôi{" "}
            <strong>không thu thập dữ liệu cá nhân nhạy cảm</strong> (tình trạng sức khỏe, dữ liệu
            sinh trắc học, thông tin tài khoản ngân hàng, quan điểm chính trị, dữ liệu vị trí…). Vui
            lòng không điền những thông tin này vào ô ghi chú.
          </p>
        </Section>

        <Section id="muc-dich" title="3. Dùng để làm gì">
          <p>Dữ liệu của bạn chỉ được dùng cho các mục đích sau:</p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>Liên hệ lại để tư vấn và báo giá quà tặng theo yêu cầu bạn đã gửi.</li>
            <li>
              Kết nối bạn với nhà cung cấp phù hợp để hoàn tất đơn hàng, khi bạn yêu cầu điều đó.
            </li>
            <li>Gửi thông tin về ưu đãi, sản phẩm mới — chỉ khi bạn đồng ý nhận.</li>
            <li>Cải thiện chất lượng dịch vụ và nội dung trên website.</li>
          </ul>
          <p>
            Chúng tôi <strong>không bán, không trao đổi, không cho thuê</strong> dữ liệu cá nhân của
            bạn dưới bất kỳ hình thức nào.
          </p>
        </Section>

        <Section id="can-cu" title="4. Căn cứ xử lý dữ liệu">
          <p>
            Chúng tôi xử lý dữ liệu của bạn dựa trên <strong>sự đồng ý</strong> mà bạn thể hiện khi
            chủ động gửi biểu mẫu, sau khi đã đọc chính sách này. Sự đồng ý là tự nguyện — bạn có
            quyền không cung cấp, và có quyền rút lại bất kỳ lúc nào (xem mục 8).
          </p>
        </Section>

        <Section id="chia-se" title="5. Ai được tiếp cận dữ liệu của bạn">
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              <strong>Nhân sự phụ trách của Nguyên Khánh Vina</strong> — để liên hệ và tư vấn cho
              bạn.
            </li>
            <li>
              <strong>Nhà cung cấp quà tặng</strong> — chỉ khi bạn yêu cầu chúng tôi kết nối, và chỉ
              những thông tin cần thiết để họ báo giá, giao hàng.
            </li>
            <li>
              <strong>Nhà cung cấp hạ tầng kỹ thuật</strong> — website được vận hành trên nền tảng
              Vercel và dữ liệu biểu mẫu được lưu trên nền tảng cơ sở dữ liệu Supabase. Đây là các
              nhà cung cấp dịch vụ có máy chủ đặt ở nước ngoài (xem mục 6).
            </li>
            <li>
              <strong>Cơ quan nhà nước có thẩm quyền</strong> — khi có yêu cầu hợp pháp theo quy
              định của pháp luật.
            </li>
          </ul>
        </Section>

        <Section id="nuoc-ngoai" title="6. Dữ liệu được lưu ở đâu">
          <p>
            Website và cơ sở dữ liệu của chúng tôi vận hành trên hạ tầng đám mây quốc tế (Vercel,
            Supabase), nghĩa là dữ liệu bạn gửi <strong>được lưu trữ trên máy chủ đặt ở nước ngoài</strong>.
            Chúng tôi thông báo rõ điều này để bạn biết trước khi quyết định cung cấp thông tin.
          </p>
          <p>
            Chúng tôi lựa chọn các nhà cung cấp có cam kết bảo mật và tiêu chuẩn bảo vệ dữ liệu quốc
            tế, đồng thời thực hiện các nghĩa vụ tương ứng theo quy định của pháp luật Việt Nam về
            chuyển dữ liệu cá nhân ra nước ngoài.
          </p>
        </Section>

        <Section id="thoi-gian-luu" title="7. Lưu trong bao lâu">
          <p>
            Chúng tôi lưu dữ liệu của bạn trong thời gian cần thiết để phục vụ mục đích đã nêu ở mục
            3, cụ thể:
          </p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              Yêu cầu tư vấn, báo giá: lưu tối đa <strong>24 tháng</strong> kể từ lần liên hệ gần
              nhất, để tiện chăm sóc khi bạn quay lại.
            </li>
            <li>
              Khi bạn rút lại sự đồng ý hoặc yêu cầu xoá: chúng tôi <strong>xoá trong vòng 72 giờ</strong>,
              trừ phần dữ liệu buộc phải lưu theo quy định pháp luật.
            </li>
          </ul>
        </Section>

        <Section id="quyen-cua-ban" title="8. Quyền của bạn">
          <p>
            Theo Luật Bảo vệ dữ liệu cá nhân, bạn có các quyền sau đối với dữ liệu của chính mình:
          </p>
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>
              <strong>Quyền được biết</strong> — biết dữ liệu của mình đang được xử lý như thế nào.
            </li>
            <li>
              <strong>Quyền đồng ý và rút lại sự đồng ý</strong> — bất kỳ lúc nào, không cần nêu lý
              do.
            </li>
            <li>
              <strong>Quyền truy cập</strong> — yêu cầu xem hoặc nhận bản sao dữ liệu chúng tôi đang
              giữ về bạn.
            </li>
            <li>
              <strong>Quyền chỉnh sửa</strong> — yêu cầu sửa dữ liệu sai hoặc chưa đầy đủ.
            </li>
            <li>
              <strong>Quyền xoá dữ liệu</strong> — yêu cầu xoá khi dữ liệu không còn cần thiết.
            </li>
            <li>
              <strong>Quyền hạn chế xử lý</strong> — yêu cầu tạm ngừng xử lý trong thời gian có
              tranh chấp.
            </li>
            <li>
              <strong>Quyền phản đối</strong> — phản đối việc xử lý dữ liệu cho mục đích tiếp thị.
            </li>
            <li>
              <strong>Quyền khiếu nại, khởi kiện và yêu cầu bồi thường</strong> — khi quyền của bạn
              bị xâm phạm.
            </li>
          </ul>
          <p className="bg-surface-2 border border-line rounded-xl px-5 py-4">
            Để thực hiện bất kỳ quyền nào ở trên, gửi email tới{" "}
            <a href="mailto:lienhe@chonquachuan.vn" className="font-semibold">
              lienhe@chonquachuan.vn
            </a>{" "}
            với tiêu đề &ldquo;Yêu cầu về dữ liệu cá nhân&rdquo;. Chúng tôi phản hồi trong vòng{" "}
            <strong>72 giờ</strong> kể từ khi nhận được yêu cầu.
          </p>
        </Section>

        <Section id="bao-mat" title="9. Chúng tôi bảo vệ dữ liệu thế nào">
          <ul className="flex flex-col gap-1.5 pl-5 list-disc marker:text-ink-soft">
            <li>Toàn bộ website chạy trên kết nối mã hoá HTTPS.</li>
            <li>
              Cơ sở dữ liệu được cấu hình phân quyền chặt: biểu mẫu công khai chỉ có thể{" "}
              <em>gửi</em> dữ liệu vào, không thể đọc, sửa hay xoá dữ liệu của người khác.
            </li>
            <li>Chỉ nhân sự được phân công mới có quyền truy cập dữ liệu khách hàng.</li>
            <li>Áp dụng nguyên tắc tối thiểu hoá — chỉ thu thập dữ liệu thực sự cần thiết.</li>
          </ul>
        </Section>

        <Section id="tre-em" title="10. Dữ liệu của trẻ em">
          <p>
            Dịch vụ của chúng tôi hướng tới người từ <strong>16 tuổi trở lên</strong>. Chúng tôi
            không chủ đích thu thập dữ liệu của trẻ em dưới 16 tuổi. Nếu bạn là cha mẹ hoặc người
            giám hộ và phát hiện con mình đã cung cấp dữ liệu cho chúng tôi, vui lòng liên hệ để
            chúng tôi xoá.
          </p>
        </Section>

        <Section id="su-co" title="11. Khi xảy ra sự cố">
          <p>
            Nếu xảy ra sự cố làm lộ, mất hoặc rò rỉ dữ liệu cá nhân, chúng tôi sẽ thông báo cho cơ
            quan chuyên trách bảo vệ dữ liệu cá nhân và cho bạn theo đúng thời hạn và trình tự pháp
            luật quy định, kèm theo mô tả sự cố và biện pháp khắc phục.
          </p>
        </Section>

        <Section id="thay-doi" title="12. Thay đổi chính sách">
          <p>
            Khi có thay đổi, chúng tôi sẽ cập nhật nội dung trên trang này và đổi ngày &ldquo;Cập
            nhật lần cuối&rdquo; ở đầu trang. Với những thay đổi lớn ảnh hưởng tới quyền của bạn,
            chúng tôi sẽ thông báo trực tiếp qua kênh liên hệ bạn đã cung cấp.
          </p>
        </Section>

        <footer className="border-t border-line pt-8 flex items-center justify-between gap-3 flex-wrap">
          <Link href="/" className="font-serif font-semibold text-[15px]">
            Chọn Quà Chuẩn
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/lien-he" className="text-ink-soft text-[13px] font-medium">
              Liên hệ
            </Link>
            <span className="text-ink-soft text-[13px]">
              © 2026 Nguyên Khánh Vina · chonquachuan.vn
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
