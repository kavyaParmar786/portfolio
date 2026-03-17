/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images from external domains if needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
