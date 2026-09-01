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
    ];
  },
};

export default nextConfig;
