/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_NODEMAILER_EMAIL: process.env.NEXT_PUBLIC_NODEMAILER_EMAIL, NEXT_PUBLIC_NODEMAILER_PASSWORD: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD },
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
