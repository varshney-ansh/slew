/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // matches all domains
          },
          {
            protocol: 'http',
            hostname: '**', // for non-https (if needed)
          },
        ],
      },
};

export default nextConfig;
