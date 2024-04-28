import { graph, config } from "@grafbase/sdk"
import { define } from "@grafbase/sdk"

const g = graph.Standalone()

export default config({
  graph: g,
  experimental: {
    kv: true,
    codegen: true,
  },
  auth: {
    rules: (rules) => {
      rules.public()
    },
  },
})

type TypeArguments = Parameters<typeof define.type>
let count = 0
const inline = (fields: TypeArguments[1]) =>
  g.ref(g.type(`Inline${count++}`, fields))

// -- website queries
// / = landing page
g.query("webIndex", {
  args: {},
  returns: inline({
    public: inline({
      field: g.boolean(),
    }).optional(),
    auth: inline({
      field: g.boolean(),
    }).optional(),
  }),
  resolver: "web/index",
})
