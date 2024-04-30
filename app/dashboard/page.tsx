import e from "@/dbschema/edgeql-js"
import { auth } from "@/edgedb"

export default async function Home() {
  let session = auth.getSession()
  const client = session.client
  const authenticated = await session.isSignedIn()

  let authData
  let publicData

  try {
    authData = await e
      .select(e.Item, (_item) => ({
        id: true,
      }))
      .run(client)
  } catch (error) {
    publicData = await e
      .select(e.Item, (_item) => ({
        name: true,
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
