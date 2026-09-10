// Bao mot khach vua dien form: ghi vao Google Sheet cua NKV + gui email bao ngay.
// Luon goi SAU khi da luu Supabase thanh cong, va KHONG await —
// Supabase moi la noi luu chinh, Sheet/email chi la lop bao tin.
// Neu buoc nay hong (mat mang, Apps Script loi) thi khach van gui form thanh cong.

export type LeadNotifyPayload = {
  name: string;
  phone?: string;
  email?: string;
  source: string;
  product_ref?: string;
  note?: string;
};

export function notifyLead(payload: LeadNotifyPayload): void {
  try {
    void fetch("/api/lead-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // im lang co chu dich - khong duoc lam hong luong gui form cua khach
  }
}
