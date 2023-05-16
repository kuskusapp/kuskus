import Stripe from "stripe"
import { Redis } from "@upstash/redis"
import { suggestionsv3, SuggestedTasks } from "@kuskusapp/ai"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// TODO: can you use graphql-code-generator types for this
// together with the client so not to do raw queries like this..

export default async function Resolver(
  _: any,
  { task }: { task: string },
  context: any
) {
  // const suggestions = await suggestionsv3(task, process.env.OPENAI_API_KEY!)
  // console.log(suggestions)
  // return {
  //   suggestedTasks: suggestions,
  //   stripeCheckoutUrl: null,
  // }

  // cache string purpose is to make semantically same task requests
  // hit the cache
  // TODO: expand to add more cases
  // like different panctuation should not avoid hitting the cache
  const cacheString = task
    .replace(" a ", "-") // remove all `a` and `an` from the task to put in cache
    .replace(" an ", "-") // do it in a better way, regex?
    .split(" ")
    .join("-")
    .toLowerCase()

  const cachedTask: SuggestedTasks | null = await redis.get(
    `gpt-3-subtasks-${cacheString}`
  )
  if (cachedTask) {
    return {
      suggestedTasks: cachedTask,
      stripeCheckoutUrl: null,
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
  const freeAiTasksAvailable =
    userDetailsJson.data.userDetailsCollection.edges[0].node
      .freeAiTasksAvailable

  // check if user can do AI task
  if (
    new Date(paidSubscriptionValidUntilDate) > new Date() ||
    freeAiTasksAvailable > 0
  ) {
  }

  // if (tasksAvailable > 0) {
  // decrement aiTasksAvailable by 1
  // query = ``

  // const model = new OpenAI({
  //   modelName: "gpt-3.5-turbo",
  //   openAIApiKey: process.env.OPENAI_API_KEY,
  // })

  // const res = await fetch("https://api.openai.com/v1/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "text-davinci-003",
  //     prompt: `Provide detailed steps to do this task: ${task}. Number each step.`,
  //     max_tokens: 200,
  //     temperature: 0,
  //   }),
  // })

  // const resJson = await res.json()
  // // @ts-ignore
  // const answer = resJson.choices[0].text.trim()
  // const suggestedTasks = parseSuggestions(answer)
  // console.log(JSON.stringify(suggestedTasks), "suggested")
  // return {
  //   suggestedTasks: suggestedTasks,
  //   stripeCheckoutUrl: null,
  // }

  // update cache
  // await redis.set(cacheString, suggestedTasks)
  //   return {
  //     suggestedTasks: null,
  //     stripeCheckoutUrl: null,
  //   }
  // }

  // user can't make the request, return a stripe payment link
  const userDetailsId =
    userDetailsJson.data.userDetailsCollection.edges[0].node.id
  try {
    const data = await stripe.checkout.sessions.create({
      success_url: process.env.STRIPE_SUCCESS_URL!,
      mode: "subscription",
      metadata: {
        userDetailsId: userDetailsId,
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
