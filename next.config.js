/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fonts.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.157.240', '192.168.0.39'],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ]
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ]
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.157.240:3000', '192.168.0.39:3000'],
      bodySizeLimit: '2mb'
    }
  }
}

module.exports = nextConfig