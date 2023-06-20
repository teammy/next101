/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/report-device',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig
