import HomeAuth from "@/components/routes/HomeAuth"
import HomePublic from "@/components/routes/HomePublic"
import { auth } from "@/edgedb-next-client"

export default async function Home() {
  const session = auth.getSession()
  const client = session.client
  const authenticated = await session.isSignedIn()

  if (!authenticated) {
    return <HomePublic data={""} />
  }
  return <HomeAuth data={""} />
}
