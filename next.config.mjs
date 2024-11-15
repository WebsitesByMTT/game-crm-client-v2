/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: '25mb',
      },
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          pathname: "**",
        },
      ],
    },
  };

export default nextConfig;
