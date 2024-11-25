import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        networkTimeoutSeconds: 15,
      },
    },
  ],
});