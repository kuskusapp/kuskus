import Stripe from "stripe"

// eslint-disable-next-line turbo/no-undeclared-env-vars
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
})

export default async function Resolver(_: any, { input }: any) {
  const { customerId } = input

  try {
    const data = await stripe.checkout.sessions.create({
      success_url: "https://kuskus.app/success",
      mode: "subscription",
      customer: customerId,
    })
    return { url: data.url }
  } catch (error) {
    console.log(error)
    return {
      url: "test",
    }
  }
}
