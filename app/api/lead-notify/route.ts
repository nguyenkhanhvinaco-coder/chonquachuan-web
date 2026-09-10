import { NextResponse } from "next/server";

// Chuyen tiep thong tin khach vua dien form sang Google Apps Script cua NKV,
// de ghi vao Sheet "NKV - Database khach hang & Theo doi lead" + gui email bao ngay.
// Code Apps Script + huong dan cai: docs/apps-script-lead-hook.gs
//
// Chay o phia may chu (khong phai trinh duyet) de duong dan webhook va ma bi mat
// khong lo ra ma nguon trang. Hai bien nay KHONG co tien to NEXT_PUBLIC_.
//
// Chua dat bien moi truong thi route tra ve ok + skipped: form van chay binh thuong,
// lead van luu vao Supabase nhu cu, chi la chua co Sheet/email.

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  product_ref?: string;
  note?: string;
};

export async function POST(request: Request) {
  const hookUrl = process.env.LEAD_HOOK_URL;
  const secret = process.env.LEAD_HOOK_SECRET;

  if (!hookUrl || !secret) {
    return NextResponse.json({ ok: true, skipped: "hook-not-configured" });
  }

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  // Cat bot do dai de mot request rac khong the do hang chuc KB vao Sheet.
  const clip = (v: unknown, max: number) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const payload = {
    secret,
    name: clip(body.name, 120),
    phone: clip(body.phone, 40),
    email: clip(body.email, 160),
    source: clip(body.source, 60),
    product_ref: clip(body.product_ref, 80),
    note: clip(body.note, 1000),
  };

  try {
    // Apps Script co the cham 1-3s; cat o 8s de route khong treo.
    const res = await fetch(hookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: `hook-${res.status}` });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Khong bao loi ra cho khach: lead da nam an toan trong Supabase roi.
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
