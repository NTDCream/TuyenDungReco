# 🚀 Hướng dẫn Kết nối Form với Google Sheets & Email

Anh NTD thực hiện theo các bước sau để kích hoạt tính năng lưu dữ liệu và gửi mail nhé:

### Bước 1: Tạo Google Sheets
1. Truy cập [sheets.new](https://sheets.new) để tạo trang tính mới.
2. Đặt tên các cột tại hàng đầu tiên (Hàng 1) đúng thứ tự:
   - Cột A: **STT**
   - Cột B: **Họ tên**
   - Cột C: **Số điện thoại**
   - Cột D: **Năm sinh**
   - Cột E: **Kinh nghiệm**
   - Cột F: **Thời gian đăng ký**

### Bước 2: Nhập mã Apps Script
1. Tại Google Sheets, vào menu **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
2. Xóa hết mã cũ và dán toàn bộ đoạn mã dưới đây vào:

```javascript
/**
 * Google Apps Script for RECO Recruitment Form
 * Developed by Antigravity for NTD
 */

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Lấy trang tính đầu tiên
  var emailAddress = "abc@gmail.com"; // Email nhận thông báo
  
  try {
    var data = e.parameter;
    var now = new Date();
    var timeString = Utilities.formatDate(now, "GMT+7", "HH:mm:ss dd/MM/yyyy");
    
    // 1. Tính toán STT (Số thứ tự tự tăng)
    var lastRow = sheet.getLastRow();
    var stt = (lastRow === 1) ? 1 : lastRow;
    
    // 2. Ghi dữ liệu vào Sheets: STT, Họ tên, SĐT, Năm sinh, Kinh nghiệm, Thời gian
    sheet.appendRow([
      stt, 
      data.fullname, 
      "'" + data.phone, // Dấu ' để tránh mất số 0
      data.year || "", 
      data.exp, // Giờ đã là tiếng Việt sẵn từ web gửi sang
      timeString
    ]);
    
    // 3. Gửi Email HTML thông báo cho anh NTD
    var sheetUrl = ss.getUrl();
    var subject = "🔥 [RECO] Ứng viên mới: " + data.fullname;
    
    var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">' +
      '<div style="background:linear-gradient(135deg,#9b1c31,#c2273e);padding:24px 30px;border-radius:12px 12px 0 0;">' +
        '<h1 style="color:#fff;margin:0;font-size:20px;">🔔 Ứng viên mới đăng ký</h1>' +
      '</div>' +
      '<div style="padding:24px 30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px;">' +
          '<tr style="background:#f9fafb;">' +
            '<td style="padding:12px 16px;font-weight:600;color:#64748b;font-size:13px;text-transform:uppercase;border-bottom:1px solid #e5e7eb;width:40%;">Thông tin</td>' +
            '<td style="padding:12px 16px;font-weight:600;color:#64748b;font-size:13px;text-transform:uppercase;border-bottom:1px solid #e5e7eb;">Chi tiết</td>' +
          '</tr>' +
          
          '<tr style="background:#fefce8;">' +
            '<td style="padding:12px 16px;color:#334155;border-bottom:1px solid #f1f5f9;">👤 Họ và tên</td>' +
            '<td style="padding:12px 16px;color:#1e293b;font-weight:700;font-size:15px;border-bottom:1px solid #f1f5f9;">' + data.fullname + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:12px 16px;color:#334155;border-bottom:1px solid #f1f5f9;">📞 Số điện thoại</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #f1f5f9;"><a href="tel:' + data.phone + '" style="color:#9b1c31;font-weight:600;text-decoration:none;">' + data.phone + '</a></td>' +
          '</tr>' +
          '<tr style="background:#f9fafb;">' +
            '<td style="padding:12px 16px;color:#334155;border-bottom:1px solid #f1f5f9;">🎂 Năm sinh</td>' +
            '<td style="padding:12px 16px;color:#1e293b;font-weight:600;border-bottom:1px solid #f1f5f9;">' + (data.year || "Không cung cấp") + '</td>' +
          '</tr>' +
          '<tr>' +
            '<td style="padding:12px 16px;color:#334155;border-bottom:1px solid #f1f5f9;">💼 Kinh nghiệm</td>' +
            '<td style="padding:12px 16px;color:#1e293b;font-weight:600;border-bottom:1px solid #f1f5f9;">' + data.exp + '</td>' +
          '</tr>' +
          '<tr style="background:#f9fafb;">' +
            '<td style="padding:12px 16px;color:#334155;">🕐 Thời gian</td>' +
            '<td style="padding:12px 16px;color:#1e293b;font-weight:600;">' + timeString + '</td>' +
          '</tr>' +
        '</table>' +
        '<div style="text-align:center;">' +
          '<a href="' + sheetUrl + '" style="display:inline-block;background:linear-gradient(135deg,#9b1c31,#c2273e);color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;">📊 Xem Google Sheets</a>' +
        '</div>' +
      '</div>' +
    '</div>';
    
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      htmlBody: htmlBody
    });
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

### Bước 3: Triển khai (Deploy)
1. Trong Apps Script, nhấn nút **Triển khai (Deploy)** (Góc trên bên phải) -> **Quản lý các bản triển khai (Manage deployments)**.
2. Chọn phiên bản hiện có, nhấn biểu tượng **Chỉnh sửa (Edit - hình cái bút)**.
3. Chọn phiên bản: **Phiên bản mới (New version)**. (Rất quan trọng)
4. Nhấn **Triển khai (Deploy)**.

Lưu ý: Nếu anh chưa bao giờ deploy, hãy tạo bản triển khai mới và chọn Ai có quyền truy cập là **Mọi người (Anyone)** tuyệt đối nhé!
