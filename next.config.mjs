/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
          'puppeteer-extra', 
          'puppeteer-extra-plugin-stealth',
        ],
      },
      crossOrigin: 'anonymous',
      reactStrictMode: false,
      
};

export default nextConfig;
