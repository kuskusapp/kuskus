const { withNextJSRouteTypes } = require("nextjs-route-types")

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [{ protocol: "https", hostname: "**" }],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb"
		}
	}
}

module.exports = withNextJSRouteTypes(nextConfig)
