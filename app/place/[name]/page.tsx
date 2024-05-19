import { auth } from "@/edgedb-next-client"
import { placesAuth } from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"
import Place from "@/components/routes/Place"

export default async function PlaceRoute({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	if (!authenticated) {
		return <></>
	}

	const data = await placesAuth.run(client, { placeName: params.name })
	return <Place data={data} />
}
