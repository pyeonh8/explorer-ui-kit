import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        // Amiibo API 이미지 호스트
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        // Nookipedia API 이미지 호스트
        protocol: 'https',
        hostname: 'dodo.ac',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
