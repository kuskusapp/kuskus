import HomeAuth from "@/components/routes/HomeAuth"
import HomePublic from "@/components/routes/HomePublic"
import { auth } from "@/edgedb-next-client"
import { homePublic } from "@/edgedb/crud/queries"

export default async function Home() {
  const session = auth.getSession()
  const client = session.client
  const authenticated = await session.isSignedIn()

  if (!authenticated) {
    const data = await homePublic.run(client)
    return <HomePublic data={data} />
  }
  return <HomeAuth data={""} />
}
