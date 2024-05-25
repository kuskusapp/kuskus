import { auth } from "@/edgedb-next-client"
import {
	profileAuth,
	profileAuthReturn,
	profilePublic,
} from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"
import ProfileRoute from "@/components/routes/ProfileRoute"

export default async function Profile({ params }: PageProps) {
	const session = auth.getSession()
	const authenticated = await session.isSignedIn()
	const client = session.client

	const publicData = await profilePublic.run(client, {
		username: params.profile,
	})
	let authData = null as profileAuthReturn | null
	if (authenticated) {
		authData = await profileAuth.run(client, {})
	}
	return (
		<ProfileRoute
			authenticated={authenticated}
			publicData={publicData}
			authData={authData}
		/>
	)
}
