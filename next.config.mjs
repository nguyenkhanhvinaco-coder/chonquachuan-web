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
      // Link dep gui khach: catalogue lat trang binh/ly giu nhiet NKV (Heyzine).
      // Tam thoi (307) de sau nay doi catalogue chi can sua destination, link gui khach giu nguyen.
      {
        source: '/catalogue-binh-giu-nhiet',
        destination: 'https://heyzine.com/flip-book/9341fe2a57.html',
        permanent: false,
      },
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
