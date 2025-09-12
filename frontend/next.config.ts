import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  /**
   * By default (false), Next.js redirects /path to /path/ (or vice versa, depending on the trailingSlash config in next.config.js). 
   * With basePath: '/blogs', it might redirect /blogs to /blogs/ repeatedly if the server doesn’t recognize the path correctly.
   * In this case, nginx server config is:
   * location /blogs/ {
      proxy_pass http://127.0.0.1:1338;
    }
   * so make trailing slash true to resolve the redirect loop and CSS loading issues!   
   */
  trailingSlash: true,
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
};

export default nextConfig;
