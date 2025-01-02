import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: 10 * 1024 * 1024, // Adjust as per your requirements
      // allowedOrigins: ['https://your-allowed-origin.com'], // Example
    },
  },
};

export default withAxiom(nextConfig);
