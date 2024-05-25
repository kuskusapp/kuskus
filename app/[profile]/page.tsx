import { auth } from "@/edgedb-next-client"
import { profileAuth } from "@/edgedb/crud/queries"
import type { PageProps } from "./$types"
import ProfileRoute from "@/components/routes/ProfileRoute"

export default async function Profile({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authData = await profileAuth.run(client, {})
	return <ProfileRoute authData={authData} />
}
