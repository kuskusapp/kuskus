import { auth } from "@/edgedb-next-client"
import { profileAuth } from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"
import Profile from "@/components/routes/Profile"

export default async function ProfileRoute({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	// if (!authenticated) {
	// 	const data = await profilePublic.run(client, { username: params.profile })
	// 	console.log(data, "data public")
	// 	return <ProfilePublic data={data} />
	// }

	const authData = await profileAuth.run(client, {})
	// console.log(authData, "auth data")
	return <Profile authData={authData} />
}
