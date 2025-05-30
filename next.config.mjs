/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Assicurati che le immagini esterne siano consentite
  images: {
    domains: ['github.com', 'highwheelesapi.salanileo.dev'],
    unoptimized: true,
  },
  // Aggiungi questa configurazione per abilitare WebSocket insicuri
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' ws://salanileohome.ddns.net:3004 http://highwheelesapi.salanileo.dev; img-src 'self' data: blob: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
