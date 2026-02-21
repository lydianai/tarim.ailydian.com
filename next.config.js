/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mapbox-gl'],
  turbopack: {},

  // Content Security Policy for external media (videos)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.pixabay.com https://cdn.pixabay.com https://*.archive.org https://archive.org",
              "media-src 'self' https://*.pixabay.com https://cdn.pixabay.com https://*.archive.org https://archive.org blob: data:",
              "font-src 'self' data:",
              "connect-src 'self' https://vercel.live https://api.openweathermap.org https://api.nasa.gov",
              "frame-src 'self' https://vercel.live",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
