import { Redis } from "@upstash/redis"
import { suggestionsv3, suggestionsv4, SuggestedTasks } from "@kuskusapp/ai"

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
  _: any,
  { task }: { task: string },
  context: any
) {
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
  const cachedTask: SuggestedTaskResponse | null = await redis.get(cacheString)

  if (cachedTask) {
    logAI(cacheString, cachedTask.suggestedTasks, cachedTask.rawResponse)
    return {
      suggestedTasks: cachedTask.suggestedTasks,
      rawResponse: cachedTask.rawResponse,
    }
  }

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

  let res = await fetch(process.env.GRAFBASE_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-api-key": context.request.headers["x-api-key"],
    },
    body: JSON.stringify({
      query: userDetailsQuery,
    }),
  })
  if (!res.ok) {
    // TODO: should this throw error?
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
      logAI(cacheString, suggestedTasks, rawResponse)
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
      logAI(cacheString, suggestedTasks, rawResponse)
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
    await fetch(process.env.GRAFBASE_API_URL!, {
      method: "POST",
      headers: {
        "x-api-key": context.request.headers["x-api-key"],
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: updateUserDetails,
      }),
    })

    const { suggestedTasks, rawResponse } = await suggestionsv3(
      task,
      process.env.OPENAI_API_KEY!
    )
    await redis.set(cacheString, {
      suggestedTasks,
      rawResponse,
    })
    logAI(cacheString, suggestedTasks, rawResponse)

    return {
      suggestedTasks: suggestedTasks,
      rawResponse: rawResponse,
    }
  }

  return {
    needPayment: true,
  }
}

// log event to tinybird
async function logAI(
  cacheString: string,
  suggestedTasks: SuggestedTasks,
  rawResponse: string
) {
  await fetch("https://api.tinybird.co/v0/events?name=suggestions", {
    method: "POST",
    body: JSON.stringify({
      cacheString,
      suggestedTasks,
      rawResponse,
    }),
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
    },
  })
}
