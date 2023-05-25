import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

type StripePlan = "normalMonthly" | "normalYearly" | "proMonthly" | "proYearly"

export default async function Resolver(
  { id }: any,
  { plan }: { plan: StripePlan },
  context: any
) {
  try {
    switch (plan) {
      case "normalMonthly":
        const normalMonthly = await stripe.checkout.sessions.create({
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
          stripeCheckoutUrl: normalMonthly.url,
        }
      case "normalYearly":
        const normalYearly = await stripe.checkout.sessions.create({
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
          stripeCheckoutUrl: normalYearly.url,
        }
      case "proMonthly":
        const proMonthly = await stripe.checkout.sessions.create({
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
          stripeCheckoutUrl: proMonthly.url,
        }

      case "proYearly":
        const proYearly = await stripe.checkout.sessions.create({
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
          stripeCheckoutUrl: proYearly.url,
        }
    }
  } catch (error) {
    console.log(error)
  }
}
