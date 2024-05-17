// using Grafbase currently to merge API endpoints in other languages into one GraphQL API
// we then generate functions to interact with the API
import { graph, config, connector } from "@grafbase/sdk"

const g = graph.Standalone()

const goApi = connector.OpenAPI("Go", {
	schema:
		"https://gist.githubusercontent.com/nikitavoloboev/39f667045e503fb170b245a14dc2209c/raw/524111c71aeda303bc5fe601c57b09474aa274f0/kuskus-go-openapi.json",
	url: "http://localhost:9999",
})

g.datasource(goApi)

export default config({
	graph: g,
	auth: {
		rules: (rules) => {
			rules.public()
		},
	},
})
