import type { Config } from "tailwindcss"
const plugin = require("tailwindcss/plugin")

const config: Config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			scrollbarHide: {
				"&::-webkit-scrollbar": {
					display: "none",
				},
				"scrollbar-width": "none",
			},
			colors: {
				primary: "rgb(14 128 95)",
				primarylight: "rgb(248 255 253)",
				primaryhover: "rgb(35 157 122)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
}
export default config
