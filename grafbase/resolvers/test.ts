export default async function Resolver(_: any) {
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
  console.log(JSON.stringify(res.json()))
}
