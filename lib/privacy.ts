// Phiên bản chính sách bảo vệ dữ liệu cá nhân đang có hiệu lực.
//
// Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 yêu cầu sự đồng ý phải "kiểm chứng
// được": khi khách tick ô đồng ý, ta lưu lại thời điểm + phiên bản chính sách họ
// đã đồng ý, để sau này chứng minh được họ đồng ý với NỘI DUNG NÀO.
//
// Mỗi lần sửa nội dung trang /chinh-sach-du-lieu-ca-nhan theo hướng ảnh hưởng tới
// quyền của khách, tăng phiên bản này VÀ đổi NGAY_CAP_NHAT trên trang đó.
export const PRIVACY_POLICY_VERSION = "2026-08-30";
