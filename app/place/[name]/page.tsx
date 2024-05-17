import { auth } from "@/edgedb-next-client"
import { placesAuth } from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"
import PlacesAuth from "@/components/routes/PlacesAuth"

export default async function Place({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	if (!authenticated) {
		return <></>
	}

	const data = await placesAuth.run(client, { placeName: params.name })
	return <PlacesAuth data={data} />
}
