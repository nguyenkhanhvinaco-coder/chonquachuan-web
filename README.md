# Chọn Quà Chuẩn — website (MVP giai đoạn 1a)

Next.js (App Router) + Tailwind + Supabase, deploy trên Vercel. Giai đoạn 1a: trưng bày sản phẩm +
wizard tìm quà + thu thông tin liên hệ (chưa có giỏ hàng/thanh toán online thật).

## 4 mốc cần làm để đưa web lên mạng

### Mốc A — Supabase (database)
1. Tạo tài khoản + project free tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor** → **New query**, dán toàn bộ nội dung file `supabase/schema.sql` → **Run**.
3. Bấm nút **"Kết nối"** → tab **"Khung"** (chọn Next.js) — copy 2 dòng trong ô `.env.local` hiện ra (`NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) — gửi lại 2 giá trị này.

### Mốc B — GitHub (lưu mã nguồn)
1. Tạo 1 repository rỗng, ví dụ `chonquachuan-web` (không cần README/license khi tạo).
2. Chạy các lệnh sau tại thư mục này để đẩy code lên (thay `<URL-repo>` bằng URL repo vừa tạo):

```
git remote add origin <URL-repo>
git branch -M main
git push -u origin main
```

### Mốc C — Vercel (host website)
1. Tạo tài khoản tại [vercel.com](https://vercel.com) (đăng nhập bằng GitHub cho nhanh).
2. **Add New → Project** → chọn repo `chonquachuan-web`.
3. Ở mục **Environment Variables**, thêm đúng 2 biến (giá trị lấy từ Mốc A):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Bấm **Deploy**. Xong sẽ có link dạng `https://chonquachuan-web.vercel.app`.

### Mốc D — Gắn tên miền riêng
1. Trong project Vercel → **Settings → Domains** → nhập `chonquachuan.vn` → Vercel cho ra 1 bản ghi
   DNS cần thêm (thường là bản ghi loại A hoặc CNAME).
2. Vào trang quản lý DNS của tên miền tại P.A Việt Nam (support.pavietnam.vn), thêm đúng bản ghi đó.
3. Đợi vài phút tới vài giờ để DNS cập nhật, sau đó `chonquachuan.vn` sẽ trỏ thẳng vào website.

## Cấu trúc thư mục

- `app/page.tsx` — Trang chủ
- `app/danh-muc/page.tsx` — Danh mục sản phẩm
- `app/tim-qua/page.tsx` — Wizard tìm quà 5 bước
- `app/tim-qua/ket-qua/page.tsx` — Trang kết quả gợi ý
- `components/LeadForm.tsx` — form thu thông tin liên hệ (dùng chung nhiều nơi)
- `lib/products.ts` — dữ liệu sản phẩm mẫu (dùng khi chưa nối Supabase) + hàm đọc từ Supabase
- `supabase/schema.sql` — script tạo bảng + dữ liệu mẫu ban đầu

## Sửa sản phẩm sau khi đã lên Supabase

Không cần sửa code — vào Supabase Dashboard → **Table Editor** → bảng `products`, sửa/thêm/xoá
dòng trực tiếp. Website tự đọc dữ liệu mới ở lần tải trang kế tiếp.
