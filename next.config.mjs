// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com"
          }
        ]
      }
    ];
  }
};

// Use export default instead of module.exports
export default nextConfig;