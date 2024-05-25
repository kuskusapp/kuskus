import { auth } from "@/edgedb-next-client"
import type { PageProps } from "./$types"

// TODO: non used route for now
export default async function Place({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	// const data = await placesAuth.run(client, { placeName: params.name })
	return <></>
}
