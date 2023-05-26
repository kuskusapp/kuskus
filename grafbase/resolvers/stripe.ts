import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

type StripePlan = "normalMonth" | "normalYear" | "proMonth" | "proYear" | "test"

export default async function Resolver(
  { id }: any,
  { plan }: { plan: StripePlan }
) {
  try {
    switch (plan) {
      case "normalMonth":
        const normalMonth = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userId: id,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_NORMAL_MONTH_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: normalMonth.url,
        }
      case "normalYear":
        const normalYear = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userId: id,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_NORMAL_YEAR_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: normalYear.url,
        }
      case "proMonth":
        const proMonth = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userId: id,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_PRO_MONTH_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: proMonth.url,
        }
      case "proYear":
        const proYear = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userId: id,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_PRO_YEAR_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: proYear.url,
        }
      case "test":
        // test
        const test = await stripe.checkout.sessions.create({
          success_url: process.env.STRIPE_SUCCESS_URL!,
          mode: "subscription",
          metadata: {
            userId: id,
          },
          line_items: [
            {
              quantity: 1,
              price: process.env.STRIPE_TEST_SUBSCRIPTION!,
            },
          ],
        })
        return {
          stripeCheckoutUrl: test.url,
        }
    }
  } catch (error) {
    console.log(error)
  }
}
