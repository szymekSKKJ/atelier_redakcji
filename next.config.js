/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_nodemailerPassword: process.env.NEXT_PUBLIC_nodemailerEmail },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
