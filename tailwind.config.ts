import { useEffect, useState } from "react"
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
				primary: "var(--primary)",
				primaryText: "var(--primaryText)",
				//rgb(14 128 95)
				primaryhover: "rgb(35 157 122)",
				secondary: "var(--secondary)",
				substitute: "var(--substitute)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		function ({ addUtilities }) {
			const newUtilities = {
				".flex-center": {
					display: "flex",
					"align-items": "center",
					"justify-content": "center",
				},
				".shadow": {
					filter: "drop-shadow(2px 8px 4px #05050570)",
				},

				".flex-between": {
					display: "flex",
					"align-items": "center",
					"justify-content": "space-between",
				},

				".flex-col": {
					display: "flex",
					"flex-direction": "column",
				},

				".flex-row": {
					display: "flex",
					"flex-direction": "row",
				},
				".button-hover": {
					color: "#F28C28",
					"border-radius": "4px",
					"transition-property": "all",
					"transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
					"transition-duration": "150ms",
					background: "rgb(38 38 38)",
					cursor: "pointer",
				},
			}
			addUtilities(newUtilities, ["responsive", "hover"])
		},
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities({
				"col-gap": (value) => {
					return {
						display: "flex",
						"flex-direction": "column",
						gap: value,
					}
				},
			})
		}),
	],
}
export default config
