// using Grafbase currently to merge API endpoints in other languages into one GraphQL API
// we then generate functions to interact with the API
import { graph, config } from "@grafbase/sdk"

const g = graph.Standalone()

export default config({
	graph: g,
	auth: {
		rules: (rules) => {
			rules.public()
		},
	},
})
