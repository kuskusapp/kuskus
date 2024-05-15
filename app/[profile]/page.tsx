import ProfileAuth from "@/components/routes/ProfileAuth"
import ProfilePublic from "@/components/routes/ProfilePublic"
import { auth } from "@/edgedb-next-client"
import { profileAuth, profilePublic } from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"

export default async function Profile({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	if (!authenticated) {
		const data = await profilePublic.run(client, { username: params.profile })
		return <ProfilePublic data={data} />
	}

	const data = await profileAuth.run(client, {})
	return <ProfileAuth data={data} />
}
