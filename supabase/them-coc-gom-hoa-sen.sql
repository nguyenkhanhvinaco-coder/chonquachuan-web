-- Them san pham "Coc Gom Su Hoa Sen Ve Tay" vao bang products.
-- Da chay qua Composio (Supabase ChonQuaChuan) ngay 2026-09-14. Giu file de
-- chay lai khi can: Supabase > SQL Editor > dan toan bo file > Run.
-- Anh nam san trong public/products/ (coc-gom-hoa-sen.jpg ... -4.jpg).
-- Coc duoc ghim o thu 3 trong FEATURED_IDS (lib/products.ts) nen hien o khu
-- noi bat dau trang chu, thay cho o Ebook cu.

insert into products (
  id, name, description, price_display, category, categories,
  is_digital, color, image, images, long_description, active
) values (
  'coc-gom-hoa-sen',
  'Cốc Gốm Sứ Hoa Sen Vẽ Tay',
  'Cốc gốm sứ 300ml, hoa sen vẽ tay, men mờ hai màu xanh bạc hà và trắng kem — mẫu mới 2026, nhận in logo.',
  'Liên hệ',
  'vat-ly',
  array['vat-ly','doi-tac'],
  false,
  'oklch(0.95 0.02 170)',
  '/products/coc-gom-hoa-sen.jpg',
  array['/products/coc-gom-hoa-sen.jpg', '/products/coc-gom-hoa-sen-2.jpg', '/products/coc-gom-hoa-sen-3.jpg', '/products/coc-gom-hoa-sen-4.jpg'],
  'Mẫu cốc mới năm 2026, họa tiết hoa sen và đài sen được vẽ tay trên từng chiếc — nét mảnh, điểm một chấm xanh ngọc, thanh nhã và đậm chất Việt mà không cầu kỳ. Vì vẽ tay nên mỗi chiếc mang nét riêng, không chiếc nào giống hệt chiếc nào.

Lớp men mờ lấm tấm hạt cho cảm giác mộc, ấm tay; hai màu xanh bạc hà và trắng kem dịu mắt, đặt cạnh nhau thành một đôi rất hợp. Dáng thang loe đáy giúp cốc đứng vững trên bàn làm việc, quai tròn to cầm chắc tay, miệng rộng dễ rửa.

Trong doanh nghiệp: quà 20/10 cho nhân viên nữ, quà tri ân khách hàng và đối tác cuối năm, quà chào mừng nhân viên mới, bộ quà hội nghị mang tinh thần văn hóa Việt.

Sự kiện và dịp kỷ niệm: quà tân gia, quà cưới theo đôi hai màu, quà cảm ơn thầy cô, quà sinh nhật cho bố mẹ và người lớn tuổi.

Dùng cá nhân: một tách trà buổi sáng thong thả, ly cà phê sữa trên bàn làm việc, hay cacao buổi tối tại nhà.

Dung tích 300ml — vừa một tách trà hay một ly cà phê sữa. Hai màu: xanh bạc hà, trắng kem.

Nhận in logo doanh nghiệp theo yêu cầu, tư vấn vị trí in để không lấn họa tiết sen, kèm tư vấn đóng hộp quà theo số lượng.',
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

-- Kiem tra sau khi chay:
-- select id, name, category, categories, image from products where id = 'coc-gom-hoa-sen';
