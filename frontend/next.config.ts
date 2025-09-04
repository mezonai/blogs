import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/mezonblogs/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blogs',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
