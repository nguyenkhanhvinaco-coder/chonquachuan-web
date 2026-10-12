/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
    return [
      // Ten mien phu cua Vercel -> ten mien chinh (2026-09-30): khach va Google chi thay chonquachuan.vn.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'chonquachuan-web.vercel.app' }],
        destination: 'https://chonquachuan.vn/:path*',
        permanent: true,
      },
      // 12/10/2026: trang tong + bai Lich Tet 2027 gop vao trang Lich go de ban 2027.
      {
        source: '/lich-tet-2027',
        destination: '/lich-go-2027#lich-tet-2027',
        permanent: false,
      },
      {
        source: '/bai-viet/lich-tet-2027-in-logo-doanh-nghiep-mau-va-bang-gia',
        destination: '/lich-go-2027#lich-tet-2027',
        permanent: false,
      },
      // Trang ket qua tim qua da bo (gom ve 1 trang /tim-qua + trang cam on).
      {
        source: '/tim-qua/ket-qua',
        destination: '/tim-qua',
        permanent: false,
      },
      // Trang Danh muc da tat (2026-09-30, chi Nga). Link cu (Google, khach da luu) ve trang chu.
      {
        source: '/danh-muc',
        destination: '/',
        permanent: false,
      },
      {
        source: '/thiep-trung-thu',
        destination: '/thiep-mien-phi',
        permanent: true,
      },
      {
        source: '/thiep-trung-thu/xem',
        destination: '/thiep-mien-phi/xem',
        permanent: true,
      },
      // /catalogue-binh-giu-nhiet KHONG con la redirect (2026-09-30, chi Nga): da thanh trang that
      // app/catalogue-binh-giu-nhiet/page.tsx, nhung catalogue Heyzine ngay tren chonquachuan.vn
      // de khach bam tu Fanpage la vao thang website, khong nhay sang heyzine.com.
      // Bao gia lat trang binh/ly giu nhiet Lock&Lock (phan khuc cao hon) — app rieng tren Vercel.
      {
        source: '/catalogue-binh-lock-lock',
        destination: 'https://nkv-bao-gia.vercel.app/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
