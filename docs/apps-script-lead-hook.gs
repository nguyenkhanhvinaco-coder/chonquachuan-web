/**
 * NKV — Nhận thông tin khách từ chonquachuan.vn
 *
 * Việc của đoạn mã này: mỗi khi có khách điền form trên website,
 *   1. ghi một dòng vào Google Sheet "NKV - Database khách hàng & Theo dõi lead"
 *   2. gửi email báo ngay về nguyenkhanhvina.co@gmail.com (chỉ khi khách có để lại SĐT hoặc email)
 *
 * ────────────────────────────────────────────────────────────
 * CÁCH CÀI (làm 1 lần, khoảng 3 phút)
 *
 * 1. Mở Sheet:
 *    https://docs.google.com/spreadsheets/d/1QfU40DAMGYqswfCRtM04IEK1-ovGBPzZrIhbAY0DSPw/edit
 *    (đăng nhập bằng nguyenkhanhvina.co@gmail.com)
 *
 * 2. Menu Tiện ích mở rộng (Extensions) → Apps Script
 *
 * 3. Xoá hết code mẫu trong đó, dán TOÀN BỘ file này vào, bấm Lưu (biểu tượng đĩa mềm)
 *
 * 4. Bấm nút Triển khai (Deploy) → Tuỳ chọn triển khai mới (New deployment)
 *      - Bấm biểu tượng bánh răng bên trái → chọn Ứng dụng web (Web app)
 *      - Thực thi với tư cách (Execute as): Tôi (Me)
 *      - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)   ← BẮT BUỘC chọn mục này
 *      - Bấm Triển khai (Deploy)
 *
 * 5. Google sẽ hỏi cấp quyền → Cho phép (Allow).
 *    Nếu hiện cảnh báo "Google chưa xác minh ứng dụng này":
 *    bấm Nâng cao (Advanced) → Chuyển đến ... (không an toàn) → Cho phép.
 *    Đây là script của chính chị, không phải của bên thứ ba.
 *
 * 6. Copy đường dẫn Ứng dụng web (dạng https://script.google.com/macros/s/..../exec)
 *    và gửi lại đường dẫn đó — em sẽ gắn vào website.
 * ────────────────────────────────────────────────────────────
 */

var SHEET_ID = '1QfU40DAMGYqswfCRtM04IEK1-ovGBPzZrIhbAY0DSPw';
var SHEET_TAB = '1. Lead từ web';
var EMAIL_TO = 'nguyenkhanhvina.co@gmail.com';

// Mã bí mật — phải trùng với biến LEAD_HOOK_SECRET đặt trên website.
// Ai không biết mã này thì không ghi được dữ liệu vào Sheet.
// KHONG luu ma that vao kho code — ban co ma day du nam ngoai repo, chi dan vao Apps Script.
var SECRET = 'DAN_MA_BI_MAT_VAO_DAY';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
    var thoiGian = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm');

    var ten = str(data.name);
    var sdt = str(data.phone);
    var email = str(data.email);
    var nguon = str(data.source);
    var quanTam = str(data.product_ref);
    var ghiChu = str(data.note);

    // Cột H-K để trống cho chị tự điền khi xử lý: Trạng thái, Việc tiếp theo, Hẹn lại, Kết quả
    sheet.appendRow([thoiGian, ten, sdt, email, nguon, quanTam, ghiChu, 'Mới', '', '', '']);

    // Chỉ gửi email khi khách thật sự để lại cách liên hệ.
    // Người tạo thiệp miễn phí không để lại SĐT/email nên chỉ lưu vào Sheet, không báo email.
    if (sdt || email) {
      MailApp.sendEmail({
        to: EMAIL_TO,
        subject: '[Khách mới] ' + (ten || 'Chưa rõ tên') + ' — ' + (nguon || 'website'),
        htmlBody:
          '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#231c15">' +
          '<p style="margin:0 0 14px"><b style="font-size:16px">Có khách vừa để lại thông tin trên chonquachuan.vn</b></p>' +
          '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">' +
          row('Thời gian', thoiGian) +
          row('Tên', ten) +
          row('SĐT / Zalo', sdt) +
          row('Email', email) +
          row('Nguồn', nguon) +
          row('Quan tâm', quanTam) +
          row('Ghi chú', ghiChu) +
          '</table>' +
          '<p style="margin:16px 0 0"><a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit" ' +
          'style="background:#c2523f;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px;display:inline-block">' +
          'Mở bảng theo dõi khách</a></p>' +
          '<p style="margin:16px 0 0;color:#6b6152;font-size:12.5px">Trả lời khách trong 24h — đây là khoảng thời gian khách còn đang đi hỏi nhiều nơi.</p>' +
          '</div>',
      });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Mở đường dẫn bằng trình duyệt sẽ thấy dòng này — dùng để kiểm tra đã triển khai đúng chưa.
function doGet() {
  return ContentService.createTextOutput('NKV lead hook dang chay.');
}

function str(v) {
  return v === null || v === undefined ? '' : String(v).trim();
}

function row(label, value) {
  if (!value) return '';
  return (
    '<tr>' +
    '<td style="color:#6b6152;white-space:nowrap;vertical-align:top">' + label + '</td>' +
    '<td style="font-weight:600">' + value + '</td>' +
    '</tr>'
  );
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
