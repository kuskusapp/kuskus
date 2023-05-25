import { Redis } from "@upstash/redis/cloudflare"
import { suggestionsv3, suggestionsv4, SuggestedTasks } from "@kuskusapp/ai"
import { z } from "zod"
import { Tinybird } from "@chronark/zod-bird"

const tb = new Tinybird({ token: process.env.TINYBIRD_API_KEY! })

const log = tb.buildIngestEndpoint({
  datasource: "resolver_suggestions_log",
  event: z.object({
    // string or stringified json
    content: z.string().default(""),
    metadata: z.string().optional().default(""),
  }),
})

const logError = tb.buildIngestEndpoint({
  datasource: "resolver_suggestions_error",
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

type SuggestedTaskResponse = {
  suggestedTasks: SuggestedTasks
  rawResponse: string
}

// TODO: can you use graphql-code-generator types for this
// together with the client so not to do raw queries like this..
export default async function Resolver(
  {
    paidSubscriptionValidUntilDate,
    freeAiTasksAvailable,
    languageModelUsed,
  }: any,
  { task }: any
) {
  await log({ content: "getting suggestions", metadata: `task: ${task}` })

  // cache string purpose is to make semantically same task requests
  // hit the cache
  // TODO: expand to add more cases
  // like different panctuation should not avoid hitting the cache
  let sanitizeTask = task
    .replace(" a ", "-") // remove all `a` and `an` from the task to put in cache
    .replace(" an ", "-") // do it in a better way, regex?
    .split(" ")
    .join("-")
    .toLowerCase()

  let cacheString = `gpt-3-subtasks-${sanitizeTask}`
  console.log(cacheString)
  const cachedTask: SuggestedTaskResponse | null = await redis
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

  console.log(cachedTask, "cachedTask")
  if (cachedTask) {
    await log({
      content: "getting suggestions from cache",
      metadata: `cachedTask: ${JSON.stringify(cachedTask)}`,
    })
    return {
      suggestedTasks: cachedTask.suggestedTasks,
      rawResponse: cachedTask.rawResponse,
    }
  }
  await log({
    content: "no suggestions for this task",
    metadata: `task: ${task}`,
  })

  // check if user can do AI task due to subscription
  if (new Date(paidSubscriptionValidUntilDate) > new Date()) {
    if (languageModelUsed === "gpt-4") {
      const { suggestedTasks, rawResponse } = await suggestionsv4(
        task,
        process.env.OPENAI_API_KEY!
      )
      cacheString = cacheString.replace("gpt-3", "gpt-4")
      await redis.set(cacheString, {
        suggestedTasks,
        rawResponse,
      })
      await log({
        content: "new gpt-4 suggested tasks response",
        metadata: `suggestedTasks: ${JSON.stringify(
          suggestedTasks
        )}. rawResponse: ${rawResponse}`,
      })
      return {
        suggestedTasks: suggestedTasks,
        rawResponse: rawResponse,
      }
    } else {
      const { suggestedTasks, rawResponse } = await suggestionsv3(
        task,
        process.env.OPENAI_API_KEY!
      )
      await redis.set(cacheString, {
        suggestedTasks,
        rawResponse,
      })
      await log({
        content: "new gpt-3 suggested tasks response",
        metadata: `suggestedTasks: ${JSON.stringify(
          suggestedTasks
        )}. rawResponse: ${rawResponse}`,
      })
      return {
        suggestedTasks: suggestedTasks,
        rawResponse: rawResponse,
      }
    }
  }

  // check if user can do AI task due to free tasks
  if (freeAiTasksAvailable > 0) {
    const { suggestedTasks, rawResponse } = await suggestionsv3(
      task,
      process.env.OPENAI_API_KEY!
    )
    await redis.set(cacheString, {
      suggestedTasks,
      rawResponse,
    })

    return {
      suggestedTasks: suggestedTasks,
      rawResponse: rawResponse,
      freeAiTaskUsed: true,
    }
  }

  return {
    needPayment: true,
  }
}
