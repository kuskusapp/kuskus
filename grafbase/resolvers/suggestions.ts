import Stripe from "stripe"
// import { OpenAI } from "langchain/llms/openai"
import { Redis } from "@upstash/redis"
import { fromMarkdown } from "mdast-util-from-markdown"
import { toMarkdown } from "mdast-util-to-markdown"
import { toString } from "mdast-util-to-string"

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
  const cacheString = task
    .replace(" a ", "-") // remove all `a` and `an` from the task to put in cache
    .replace(" an ", "-") // do it in a better way, regex?
    .split(" ")
    .join("-")
    .toLowerCase()

  const cachedTask: CachedTask | null = await redis.get(
    `gpt-3-subtasks-${cacheString}`
  )
  if (cachedTask) {
    return {
      suggestedTasks: cachedTask.subtasks,
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
    // TODO: should this throw error? I don't know..
    // maybe should return graphql back with `error: ` field?
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  const resJson = await res.json()

  const tasksAvailable =
    resJson.data.userDetailsCollection.edges[0].node.aiTasksAvailable

  if (tasksAvailable > 0) {
    // decrement aiTasksAvailable by 1
    // query = ``

    // const model = new OpenAI({
    //   modelName: "gpt-3.5-turbo",
    //   openAIApiKey: process.env.OPENAI_API_KEY,
    // })

  //   const response = await fetch('https://api.openai.com/v1/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     model: 'text-davinci-003',
  //     task,
  //     max_tokens: 200,
  //     temperature: 0
  //   })
  // })
  // console.log(response)
  // return {

  // }

    // const res = await model.call(
    //   `Provide detailed steps to do this task: ${task}. Use bullet points for each step.`
    // )

    const cakeInstructions = `
Baking a cake involves several steps that need to be followed religiously to get a perfectly baked cake. Here is a step-by-step guide on how to bake a cake:

Ingredients:

- 2 cups of flour
- 2 cups of sugar
- 4 eggs
- 1 cup of milk
- 1 cup of unsalted butter
- 2 teaspoons of baking powder
- 1 teaspoon of vanilla essence

Steps:

1. Preheat oven to 350°F (175°C) and grease the cake pan with a non-stick spray.

This should be  a note.

Can have code blocks too inside potentially.

2. Take a medium-sized bowl and mix together the flour and baking powder. Set it aside.

3. In a separate large-sized bowl, cream together the sugar and butter until the mixture turns pale and fluffy.

4. Add eggs to the sugar-butter mixture, one at a time, and beat well after each addition.

5. Mix in the vanilla essence.

6. Gradually add the flour mixture to the sugar-butter mixture, alternating with milk until everything is combined. Beat the batter well, but don't overmix.

7. Pour the batter into the prepared cake pan and smooth the surface with a spatula.

8. Tap the cake pan gently onto the kitchen countertop to remove any air bubbles.

9. Place the cake pan in the preheated oven and bake the cake for 30-35 minutes or until the toothpick inserted in the center comes out clean.

10. Remove the cake pan from the oven and let it cool down on the wire rack.

11. Once the cake is cool, you can decorate it with frosting or icing, or traditional buttercream.

12. Your cake is ready to serve. Cut into pieces and enjoy.

Baking a cake is easy if you follow the above mentioned step-by-step guide carefully. You can even decorate it as per your preference or occasion.
`
    // console.log(res, "res")
    const suggestedTasks = parseSuggestions(cakeInstructions)
    console.log(suggestedTasks)
    return {
      suggestedTasks: suggestedTasks,
      stripeCheckoutUrl: null,
    }


    // update cache
    // await redis.set(cacheString, suggestedTasks)
    return {
      suggestedTasks: null,
      stripeCheckoutUrl: null,
    }
  }

  // user can't make the request, return a stripe payment link
  const userDetailsId = resJson.data.userDetailsCollection.edges[0].node.id
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

type SuggestedTasks = {
  intro?: string
  tasks: SuggestedTask[]
}
type SuggestedTask = {
  task: string
  note?: string
}


// parse a string of markdown and return a list of suggested tasks
function parseSuggestions(markdownString: string) {
  const tree = fromMarkdown(markdownString)

  const tasks: SuggestedTasks = { tasks: [] }

  let atSteps = false
  let currentNote = ""
  let currentTask = null

  for (const node of tree.children) {
    if (node.type === "paragraph") {
      const text = toString(node)

      if (/^steps:$/i.test(text.trim())) {
        // Only assign the intro field if there's content before the tasks
        // @ts-ignore
        if (node.position.start.offset > 1) {
          tasks.intro = markdownString
          // @ts-ignore
            .slice(0, node.position.start.offset - 1)
            .trim()
        }
        atSteps = true
      } else if (atSteps) {
        // Accumulate notes
        currentNote += text + "\n"
      }
    }

    if (
      (atSteps || tasks.intro === undefined) &&
      node.type === "list" &&
      node.start
    ) {
      // If we haven't encountered "Steps:" yet, but we found a numbered list, we assume that's where tasks start
      if (!atSteps) {
        // Only assign the intro field if there's content before the tasks
        // @ts-ignore
        if (node.position.start.offset > 1) {
          tasks.intro = markdownString
          // @ts-ignore
            .slice(0, node.position.start.offset - 1)
            .trim()
        }
        atSteps = true
      }

      for (const item of node.children) {
        // If there's a current task, it means we've encountered a new task and should add the current one to the list
        if (currentTask) {
          tasks.tasks.push({
            task: currentTask,
            note: currentNote.trim() || undefined,
          })
          // Reset currentNote for the next task
          currentNote = ""
        }

        const head = item.children[0]
        const taskAndNote = toMarkdown(head).trim().split(/:(.+)/)

        if (taskAndNote.length > 1) {
          currentTask = taskAndNote[0].trim() + ":"
          currentNote = taskAndNote[1].trim()
        } else {
          currentTask = taskAndNote[0].trim()
        }
      }
    }
  }

  // Don't forget to add the last task
  if (currentTask) {
    tasks.tasks.push({
      task: currentTask,
      note: currentNote.trim() || undefined,
    })
  }

  return tasks
}
