// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ["expo", "prettier"],
	// TODO: trying to solve the warnings with `Require cycles are allowed, but can result in uninitialized values`
	// doesn't work
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": "error",
		"import/no-cycle": "error",
	},
}
