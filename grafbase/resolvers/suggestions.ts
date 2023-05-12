import Stripe from "stripe"
import { Redis } from "@upstash/redis"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

type CachedTask = {
  subtasks: SuggestedTasks[]
}

type SuggestedTasks = {
  title: string
  note: string
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
  // const cacheString = task
  //   .replace(" a ", "-") // remove all `a` and `an` from the task to put in cache
  //   .replace(" an ", "-") // do it in a better way, regex?
  //   .split(" ")
  //   .join("-")
  //   .toLowerCase()

  // const cachedTask: CachedTask | null = await redis.get(
  //   `gpt-3-subtasks-${cacheString}`
  // )
  // if (cachedTask) {
  //   return {
  //     suggestedTasks: cachedTask.subtasks,
  //     stripeCheckoutUrl: null,
  //   }
  // }

  // TODO: fix below
  // ai should work
  // stripe return page should work too
  // return {}

  // TODO: there should probably be a better way than userCollection
  // but for that I need to know the specific user id, maybe pass it?
  // in theory userCollection should work too though but is probably slower
  let userDetailsQuery = `
    {
      userDetailsCollection(first: 1) {
        edges {
          node {
            id
            aiTasksAvailable
          }
        }
      }
    }
  `

  // get user's aiTasksAvailable & id
  const res = await fetch(process.env.GRAFBASE_API_URL!, {
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
    // TODO: should this throw error? probably not
    // maybe should return graphql back with `error: ` field? or something
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const resJson = await res.json()

  const tasksAvailable =
    resJson.data.userDetailsCollection.edges[0].node.aiTasksAvailable

  // if (tasksAvailable > 0) {
  //   // decrement aiTasksAvailable by 1
  //   // query = ``

  //   const suggestions = await fetch(
  //     `${process.env.AI_ENDPOINT}/subtasks?request=${task}`,
  //     {
  //       headers: {
  //         OPENAI_KEY: process.env.OPENAI_API_KEY!,
  //       },
  //     }
  //   )

  //   // update cache
  //   // await redis.set(cacheString, suggestions.json())
  //   // console.log(JSON.stringify(suggestions.json()))
  // return {
  //   suggestedTasks: suggestions.json(),
  //   stripeCheckoutUrl: null,
  // }
  // }
  // console.log(userDetailsId, "hello")

  const userDetailsId = resJson.data.userDetailsCollection.edges[0].node.id
  // user can't make the request, return a stripe payment link
  try {
    const data = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL!,
      mode: "subscription",
      metadata: {
        userId: userDetailsId,
      },
      line_items: [
        {
          quantity: 1,
          price: process.env.STRIPE_PRICE_ID!,
        },
      ],
    })
    return {
      suggestedTasks: null,
      stripeCheckoutUrl: data.url,
    }
  } catch (error) {
    console.log(error)
  }
}
