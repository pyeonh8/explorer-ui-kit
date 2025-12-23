import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        // Amiibo API 이미지 호스트
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/N3evin/AmiiboAPI/master/images/**',
      },
    ],
  },
};

export default nextConfig;
