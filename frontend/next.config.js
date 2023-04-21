/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  ...nextConfig,
  images: {
    domains: ["*.ipfs.w3s.link"],
  },
};
