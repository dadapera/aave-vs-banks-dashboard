/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/banks',
        destination: '/api/banks',
      },
      {
        source: '/api/aave',
        destination: '/api/aave',
      },
    ];
  },
};

module.exports = nextConfig;
