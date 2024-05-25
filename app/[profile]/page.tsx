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
	const client = session.client
	const authenticated = await session.isSignedIn()

	const publicData = await profilePublic.run(client, {
		username: params.profile,
	})
	let authData = null as profileAuthReturn | null
	if (authenticated) {
		authData = await profileAuth.run(client, {})
	}
	return (
		<ProfileRoute
			publicData={publicData}
			authData={authData}
			authenticated={authenticated}
		/>
	)
}
