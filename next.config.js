const { withNextJSRouteTypes } = require("nextjs-route-types")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
}

module.exports = withNextJSRouteTypes(nextConfig)
