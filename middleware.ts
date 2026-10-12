import { NextResponse, type NextRequest } from "next/server";

// 12/10/2026: link viết hoa (vd. chị Nga gõ "/lich-Tet-2027/Lich-go-2027") chuyển về đúng link chữ thường.
// Chỉ áp dụng cho khu lịch Tết; redirects trong next.config không dùng được vì so khớp không phân biệt hoa thường.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const thuong = pathname.toLowerCase();
  if (pathname !== thuong) {
    const url = req.nextUrl.clone();
    url.pathname = thuong;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/(lich-tet-2027|Lich-tet-2027|lich-Tet-2027|Lich-Tet-2027|LICH-TET-2027)/:path*"],
};
