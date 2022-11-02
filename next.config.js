/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "data:image", "plus.unsplash.com"],
  },
};

module.exports = nextConfig;
