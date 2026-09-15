-- Them san pham "Long Den Trung Thu Tang Cac Be" vao bang products.
-- Da chay qua Composio (Supabase ChonQuaChuan) ngay 2026-09-15. Giu file de chay
-- lai khi can: Supabase > SQL Editor > dan toan bo file > Run.
-- Anh o public/products/long-den-trung-thu*.jpg - chi mau khong co nhan vat ban quyen.
-- San pham theo mua: het Trung Thu thi dat active = false va bo id khoi FEATURED_IDS.

insert into products (
  id, name, description, price_display, category, categories,
  is_digital, color, image, images, long_description, active
) values (
  'long-den-trung-thu',
  'Lồng Đèn Trung Thu Tặng Các Bé',
  'Lồng đèn giấy ánh kim nhiều mẫu dễ thương, 8.000đ/chiếc (chưa VAT), nhận đơn từ 50 chiếc — quà Trung Thu cho cơ quan, doanh nghiệp, trường học.',
  '8.000đ/chiếc (chưa VAT)',
  'vat-ly',
  array['vat-ly','doi-tac'],
  false,
  'oklch(0.3 0.07 262)',
  '/products/long-den-trung-thu.jpg',
  array['/products/long-den-trung-thu.jpg', '/products/long-den-trung-thu-2.jpg', '/products/long-den-trung-thu-3.jpg', '/products/long-den-trung-thu-4.jpg'],
  'Mùa trăng rằm, món quà các bé mong nhất vẫn là một chiếc lồng đèn để cầm đi rước đèn cùng bạn bè. Lồng đèn giấy ánh kim lấp lánh, tạo hình các bé con, chú lân, nàng tiên cá, kỳ lân… dễ thương, có cán cầm và phần đế dạng hộp.

Trong cơ quan, doanh nghiệp: quà Trung Thu cho con em cán bộ, nhân viên; quà cho các bé trong chương trình vui Trung Thu của đoàn thể, khu phố; quà tri ân gia đình khách hàng.

Trường học và nhóm lớp: phát quà cho học sinh mầm non, tiểu học trong ngày hội trăng rằm.

Giá 8.000đ/chiếc (chưa VAT), nhận đơn từ 50 chiếc trở lên. Trung Thu năm nay rơi vào 25/9 — nên đặt sớm để chủ động thời gian nhận hàng.

Còn nhiều mẫu khác ngoài các mẫu trong ảnh — nhắn Zalo OA hoặc để lại thông tin để nhận trọn bộ mẫu và báo giá theo số lượng. Gửi kèm lời chúc bằng thiệp tranh vẽ miễn phí tại chonquachuan.vn/thiep-mien-phi.',
  true
)
on conflict (id) do update set
  name             = excluded.name,
  description      = excluded.description,
  price_display    = excluded.price_display,
  category         = excluded.category,
  categories       = excluded.categories,
  color            = excluded.color,
  image            = excluded.image,
  images           = excluded.images,
  long_description = excluded.long_description,
  active           = excluded.active;

-- Kiem tra:
-- select id, name, price_display, categories from products where id = 'long-den-trung-thu';
