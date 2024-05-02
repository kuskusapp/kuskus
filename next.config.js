const { withNextJSRouteTypes } = require("nextjs-route-types");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.kuskus.app']
  }
}

module.exports = withNextJSRouteTypes(nextConfig)
