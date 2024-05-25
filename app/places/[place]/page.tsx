import PlacesRoute from "@/components/routes/PlacesRoute"
import { auth } from "@/edgedb-next-client"
import type { PageProps } from "./$types"
import { placesPublic } from "@/edgedb/crud/queries"

export default async function PlaceRoute({ params }: PageProps) {
	const session = auth.getSession()
	const authenticated = await session.isSignedIn()
	const client = session.client

	const publicData = await placesPublic.run(client, { placeName: params.place })

	return <PlacesRoute authenticated={authenticated} publicData={publicData} />
}
