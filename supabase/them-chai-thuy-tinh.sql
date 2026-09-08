-- Them san pham "Chai Nuoc Thuy Tinh Trong Suot" vao bang products.
-- CACH CHAY: mo Supabase > SQL Editor > dan toan bo file nay > Run.
--
-- Vi sao can buoc nay: site doc san pham tu Supabase (lib/products.ts >
-- getProducts). Mang seedProducts trong code chi la du lieu du phong khi
-- Supabase loi hoac rong, nen them vao code KHONG du de san pham hien len
-- website that.
--
-- Anh da nam san trong public/products/ (chai-thuy-tinh.jpg ... -4.jpg).
-- Anh dai dien co ba chai kich co khac nhau dung canh nhau, de nguoi xem
-- hieu ngay san pham co nhieu dung tich ma khong can doc chu.

insert into products (
  id, name, description, price_display, category,
  is_digital, color, image, images, long_description, active
) values (
  'chai-thuy-tinh',
  'Chai Nước Thủy Tinh Trong Suốt',
  'Chai thủy tinh nắp vặn kín, hai dung tích 300ml và 500ml, nhận in logo theo yêu cầu.',
  'Liên hệ',
  'vat-ly',
  false,
  'oklch(0.86 0.05 220)',
  '/products/chai-thuy-tinh.jpg',
  '{"/products/chai-thuy-tinh.jpg","/products/chai-thuy-tinh-2.jpg","/products/chai-thuy-tinh-3.jpg","/products/chai-thuy-tinh-4.jpg"}',
  'Thân trụ tối giản, thủy tinh trong vắt nhìn rõ đồ uống bên trong, nắp vặn kín không lo rò rỉ khi để trong túi xách. Một chiếc chai đủ đẹp để đặt trên bàn họp tiếp khách, đủ bền để mang theo cả ngày dài.

Trong doanh nghiệp: đặt bàn phòng họp tiếp khách, trang bị cho khách sạn và văn phòng, làm quà tặng đối tác và nhân viên, phục vụ hội nghị và sự kiện cơ quan đoàn thể.

Sự kiện và dịp kỷ niệm: quà cưới, quà lễ tốt nghiệp, quà họp lớp và kỷ niệm trường, quà lưu niệm cho giải thể thao và hoạt động phong trào.

Dùng cá nhân: mang theo khi đi bộ đường dài, cắm trại, du lịch, hoặc đơn giản là một tách trà chiều tại nhà. Dùng được với cả đồ uống nóng và đồ uống lạnh.

Hai dung tích 300ml và 500ml — chọn 300ml cho bàn họp và bàn làm việc, 500ml cho người mang theo cả ngày. Nắp nhựa có ron bên trong, miệng chai rộng nên dễ cho đá viên vào và dễ rửa sạch tận đáy.

Nhận in logo lên thân chai theo yêu cầu, tư vấn vị trí và kích thước in phù hợp với từng dung tích.',
  true
)
on conflict (id) do update set
  name             = excluded.name,
  description      = excluded.description,
  price_display    = excluded.price_display,
  category         = excluded.category,
  color            = excluded.color,
  image            = excluded.image,
  images           = excluded.images,
  long_description = excluded.long_description,
  active           = excluded.active;

-- Kiem tra sau khi chay:
-- select id, name, category, image from products where id = 'chai-thuy-tinh';
