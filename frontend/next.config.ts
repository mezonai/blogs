import type { NextConfig } from 'next';

const isStatic = process.env.NEXT_PUBLIC_STATIC_BUILD === 'true';

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: isStatic ? 'export' : undefined,
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
