import { Redis } from "@upstash/redis/cloudflare"
import { suggestionsv3, suggestionsv4, SuggestedTasks } from "@kuskusapp/ai"
import { z } from "zod"
import { Tinybird } from "@chronark/zod-bird"
// import { GraphQLClient } from "graphql-request"
// import { UserDetailsDocument } from "~/graphql/schema"

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
export default async function Resolver(_: any, { task }: { task: string }) {
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

  // console.log(sanitizeTask, "sanitize task")
  // console.log(cacheString, "cache string")
  let cacheString = `gpt-3-subtasks-${sanitizeTask}`
  const cachedTask: SuggestedTaskResponse | null = await redis
    .get(cacheString)
    .catch((err) => {
      console.log(err, "failed to get cached task, error")
    })
    .then()
  console.log(cachedTask, "cached task")
  console.log("trying again")

  if (cachedTask) {
    await log({
      content: "getting suggestions from cache",
      metadata: `cachedTask: ${JSON.stringify(cachedTask)}`,
    })
    console.log("getting from cache")
    return {
      suggestedTasks: cachedTask.suggestedTasks,
      rawResponse: cachedTask.rawResponse,
    }
  }
  await log({
    content: "no suggestions for this task",
    metadata: `task: ${task}`,
  })

  // TODO: there should probably be a better way than userDetailsCollection
  // I try to make sure there is only one userDetails per user
  // sadly grafbase can't enforce that yet so I have to do this..
  let userDetailsQuery = `
    {
      userDetailsCollection(first: 1) {
        edges {
          node {
            id
            freeAiTasksAvailable
            paidSubscriptionValidUntilDate
            languageModelUsed
          }
        }
      }
    }
  `

  let res = await fetch(process.env.API_OF_GRAFBASE!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": process.env.KEY_OF_GRAFBASE!,
    },
    body: JSON.stringify({
      query: userDetailsQuery,
    }),
  })
  console.log(res, "response from grafbase with user details")
  if (!res.ok) {
    console.log(res.ok, "res.ok")
    logError({
      error: "Failed to get user details from grafbase",
      metadata: `res.stats: ${res.status}`,
    })
    // TODO: what should this be? throw new Error??
    // maybe should return graphql back with `error: ` field?
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const userDetailsJson = await res.json()
  const paidSubscriptionValidUntilDate =
    userDetailsJson.data.userDetailsCollection.edges[0].node
      .paidSubscriptionValidUntilDate
  const languageModelUsed =
    userDetailsJson.data.userDetailsCollection.edges[0].node.languageModelUsed

  // check if user can do AI task due to subscription
  if (new Date(paidSubscriptionValidUntilDate) > new Date()) {
    console.log("user is subscribed")
    if (languageModelUsed === "gpt-4") {
      console.log("do gpt-4")
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
      console.log("do gpt-3")
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

  const userDetailsId =
    userDetailsJson.data.userDetailsCollection.edges[0].node.id
  const freeAiTasksAvailable =
    userDetailsJson.data.userDetailsCollection.edges[0].node
      .freeAiTasksAvailable
  // check if user can do AI task due to free tasks
  if (freeAiTasksAvailable > 0) {
    console.log("do task with free ai tasks")
    // TODO: can return nothing from graphql, not sure how..
    let updateUserDetails = `
      mutation {
        userDetailsUpdate(
          by: {
            id: "${userDetailsId}"
          }
          input: {
            freeAiTasksAvailable: {
              set: ${freeAiTasksAvailable - 1}
            }
          }
        ) {
          userDetails {
            freeAiTasksAvailable
          }
        }
      }
    `
    const resFromFetch = await fetch(process.env.API_OF_GRAFBASE!, {
      method: "POST",
      headers: {
        "x-api-key": process.env.KEY_OF_GRAFBASE!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: updateUserDetails,
      }),
    })
    console.log(resFromFetch, "res from fetch to update user details")

    const { suggestedTasks, rawResponse } = await suggestionsv3(
      task,
      process.env.OPENAI_API_KEY!
    )
    console.log(suggestedTasks, "suggested tasks")
    const s = await redis.set(cacheString, {
      suggestedTasks,
      rawResponse,
    })

    console.log(s, "result from trying to save to upstash cache ")

    return {
      suggestedTasks: suggestedTasks,
      rawResponse: rawResponse,
    }
  }

  return {
    needPayment: true,
  }
}
