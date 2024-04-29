import e from "@/dbschema/edgeql-js"
import { createClient } from "edgedb"
import { auth } from "@/edgedb"

export default async function Home() {
  const client = createClient()
  const session = auth.getSession()
  let authData
  let publicData
  if (session.authToken) {
    authData = await e
      .select(e.Item, (_item) => ({
        id: true,
        name: true,
        created: true,
        updated: true,
        created_by: {
          name: true,
          email: true,
        },
      }))
      .run(client)
  } else {
    publicData = await e
      .select(e.Item, (_item) => ({
        id: true,
        name: true,
        created: true,
        updated: true,
        created_by: {
          name: true,
          email: true,
        },
      }))
      .run(client)
  }

  return (
    <>
      {authData && (
        <header className="flex justify-between items-center pb-4">
          <div>Authenticated data:</div>
        </header>
      )}
      {publicData && (
        <header className="flex justify-between items-center pb-4">
          <div>Public data:</div>
        </header>
      )}
    </>
  )
}
