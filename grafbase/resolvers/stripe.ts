import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

type StripePlan = "normalMonthly" | "normalYearly" | "proMonthly" | "proYearly"

export default async function Resolver(
  _: any,
  { plan }: { plan: StripePlan },
  context: any
) {
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
  const userDetailsId =
    userDetailsJson.data.userDetailsCollection.edges[0].node.id

  try {
    switch (plan) {
      case "normalMonthly":
        const normalMonthly = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userDetailsId: userDetailsId,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_10_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: normalMonthly.url,
        }
      case "normalYearly":
        const normalYearly = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userDetailsId: userDetailsId,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_10_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: normalYearly.url,
        }
      case "proMonthly":
        const proMonthly = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userDetailsId: userDetailsId,
          },
          line_items: [
            {
              quantity: 1,
              // price: process.env.STRIPE_10_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: proMonthly.url,
        }

      case "proYearly":
        const proYearly = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userDetailsId: userDetailsId,
          },
          line_items: [
            {
              quantity: 1,
              // price: process.env.STRIPE_10_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: proYearly.url,
        }
    }
  } catch (error) {
    console.log(error)
  }
}
