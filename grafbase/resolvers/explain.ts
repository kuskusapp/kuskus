import { Redis } from "@upstash/redis/cloudflare"
import { explainTaskv3, explainTaskv4 } from "@kuskusapp/ai"
import { z } from "zod"
import { Tinybird } from "@chronark/zod-bird"

const tb = new Tinybird({ token: process.env.TINYBIRD_API_KEY! })

const log = tb.buildIngestEndpoint({
  datasource: "resolver_explain_log",
  event: z.object({
    // string or stringified json
    content: z.string().default(""),
    metadata: z.string().optional().default(""),
  }),
})

const logError = tb.buildIngestEndpoint({
  datasource: "resolver_explain_error",
  event: z.object({
    // string or stringified json
    error: z.string().default(""),
    metadata: z.string().optional().default(""),
  }),
})

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export default async function Resolver(
  {
    paidSubscriptionValidUntilDate,
    freeAiTasksAvailable,
    languageModelUsed,
  }: any,
  { task }: any
) {
  await log({ content: "explaining a task", metadata: `task: ${task}` })

  let sanitizeTask = task
    .replace(" a ", "-") // remove all `a` and `an` from the task to put in cache
    .replace(" an ", "-") // do it in a better way, regex?
    .split(" ")
    .join("-")
    .toLowerCase()
  let cacheString = `gpt-3-explain-${sanitizeTask}`

  const cachedExplanation: { rawResponse: string } | null = await redis
    .get(cacheString)
    .catch((err) => {
      console.log(err, "err")
      logError({
        error: "Failed to get task from redis",
        metadata: `error: ${err}`,
      })
      return
    })
    .then()

  if (cachedExplanation) {
    await log({
      content: "getting explanation from cache",
      metadata: `cachedExplanation: ${JSON.stringify(cachedExplanation)}`,
    })
    return {
      rawResponse: cachedExplanation.rawResponse,
    }
  }
  await log({
    content: "no explanation for this task",
    metadata: `task: ${task}`,
  })

  // check if user can do AI task due to subscription
  if (new Date(paidSubscriptionValidUntilDate) > new Date()) {
    if (languageModelUsed === "gpt-4") {
      const { rawResponse } = await explainTaskv4(
        task,
        process.env.OPENAI_API_KEY!
      )
      cacheString = cacheString.replace("gpt-3", "gpt-4")
      await redis.set(cacheString, {
        rawResponse,
      })
      await log({
        content: "new gpt-4 explanation",
        metadata: `explanation: ${rawResponse}`,
      })
      return {
        rawResponse,
      }
    } else {
      const { rawResponse } = await explainTaskv3(
        task,
        process.env.OPENAI_API_KEY!
      )
      await redis.set(cacheString, {
        rawResponse,
      })
      await log({
        content: "new gpt-3 explanation",
        metadata: `explanation: ${rawResponse}`,
      })
      return {
        rawResponse,
      }
    }
  }

  // check if user can do AI task due to free tasks
  if (freeAiTasksAvailable > 0) {
    const { rawResponse } = await explainTaskv3(
      task,
      process.env.OPENAI_API_KEY!
    )
    await redis.set(cacheString, {
      rawResponse,
    })
    await log({
      content: "new gpt-3 explanation",
      metadata: `explanation: ${rawResponse}`,
    })
    return {
      rawResponse: rawResponse,
      freeAiTaskUsed: true,
    }
  }

  return {
    needPayment: true,
  }
}
