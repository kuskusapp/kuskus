import Home from "@/components/Home"
import { auth } from "@/edgedb-next-client"
import { homePublic } from "@/edgedb/crud/queries"

export default async function HomeRoute() {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	const data = await homePublic.run(client)

	// if (!authenticated) {
	//   const data = await homePublic.run(client)
	//   return <HomePublic data={data} />
	// }
	// return <HomeAuth data={""} />

	return <Home data={data} authenticated={authenticated} />
}
