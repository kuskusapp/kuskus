import { z } from "zod"
import { Tinybird } from "@chronark/zod-bird"

const tb = new Tinybird({ token: import.meta.env.VITE_TINYBIRD_API_KEY })

export const log = tb.buildIngestEndpoint({
  datasource: "web_log",
  event: z.object({
    // string or stringified json
    content: z.string().default(""),
    metadata: z.string().optional().default(""),
  }),
})

export const logError = tb.buildIngestEndpoint({
  datasource: "web_error",
  event: z.object({
    // string or stringified json
    error: z.string().default(""),
    metadata: z.string().optional().default(""),
  }),
})
