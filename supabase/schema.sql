-- Chạy toàn bộ file này trong Supabase Dashboard → SQL Editor → New query → Run

create table if not exists products (
  id text primary key,
  name text not null,
  description text not null,
  price_display text not null,
  category text not null,
  is_digital boolean not null default false,
  color text not null default 'var(--accent)',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  note text,
  product_ref text,
  source text,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table leads enable row level security;

-- Ai cũng đọc được danh sách sản phẩm (hiển thị công khai trên site)
create policy "products are publicly readable"
  on products for select
  using (true);

-- Ai cũng gửi được yêu cầu (form liên hệ công khai), nhưng không đọc/sửa/xoá được
create policy "anyone can submit a lead"
  on leads for insert
  with check (true);

-- Dữ liệu mẫu ban đầu — khớp với lib/products.ts trong code.
-- Sau này sửa/thêm sản phẩm trực tiếp trong Table Editor của Supabase, không cần sửa code.
insert into products (id, name, description, price_display, category, is_digital, color) values
  ('tra-thao-moc', 'Set Trà Thảo Mộc Thủ Công', 'Trà sen, trà hoa cúc thủ công kèm hộp gỗ khắc logo.', '500.000đ - 700.000đ', 'vat-ly', false, 'var(--accent)'),
  ('ebook-loi-chuc', 'Ebook 30 Lời Chúc Ý Nghĩa', 'File PDF tuyển chọn lời chúc theo dịp tặng.', '49.000đ', 'qua-so', true, 'oklch(0.6 0.1 250)'),
  ('nen-thom', 'Hộp Nến Thơm Handmade', 'Nến sáp đậu nành thơm tự nhiên, thiết kế tối giản.', '450.000đ - 650.000đ', 'vat-ly', false, 'var(--sage)'),
  ('khoa-hoc-goi-qua', 'Khóa Học Mini: Gói Quà Đẹp', 'Video hướng dẫn gói quà tại nhà, 5 bài.', '199.000đ', 'qua-so', true, 'oklch(0.62 0.13 20)'),
  ('van-phong-tri-an', 'Set Văn Phòng Tri Ân', 'Sổ tay da, bút kim loại khắc tên, hộp quà sang trọng.', '600.000đ - 900.000đ', 'doi-tac', false, 'oklch(0.62 0.1 80)'),
  ('thiep-tet', 'File Thiệp Chúc Tết Thiết Kế Riêng', 'File in thiệp tuỳ chỉnh tên công ty.', '89.000đ', 'qua-so', true, 'oklch(0.6 0.14 350)'),
  ('tui-qua-tet', 'Túi Quà Tết Sáng Tạo', 'Mứt thủ công, trà, thiệp chúc Tết thiết kế riêng.', '500.000đ - 800.000đ', 'vat-ly', false, 'oklch(0.6 0.12 300)'),
  ('cham-soc-ca-nhan', 'Set Chăm Sóc Cá Nhân', 'Tinh dầu, xà phòng handmade, khăn cotton hữu cơ.', '550.000đ - 750.000đ', 'vat-ly', false, 'oklch(0.6 0.16 130)')
on conflict (id) do nothing;
