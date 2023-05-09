import Stripe from "stripe"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

export default async function Resolver(_: any, { input }: any) {
  const { query } = input

  // check if current user `aiTasksAvailable` is greater than 0
  // graphql query?
  let aiTasksAvailable = 1

  if (aiTasksAvailable > 0) {
    // decreate aiTasksAvailable by 1
    // graphql?
    aiTasksAvailable--

    const res = await fetch(
      `${process.env.AI_ENDPOINT}/subtasks?request=${query}`,
      {
        headers: {
          OPENAI_KEY: process.env.OPENAI_API_KEY!,
        },
      }
    )
    return res.json()
  }

  // user can't make the request, return a stripe page
  // change stripe page
  try {
    const data = await stripe.checkout.sessions.create({
      success_url: "https://kuskus.app/success",
      mode: "subscription",
      subscription_data: {
        trial_period_days: 7,
      },
    })
    return { url: data.url }
  } catch (error) {
    console.log(error)
    return {
      url: "test",
    }
  }
}
