import SettingsRoute from "@/components/routes/SettingsRoute"
import { auth } from "@/edgedb-next-client"
import { settingsAuth, settingsAuthReturn } from "@/edgedb/crud/queries"

export default async function Settings() {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	let authData: settingsAuthReturn | null = null
	if (authenticated) {
		authData = await settingsAuth.run(client, {})
	}
	return <SettingsRoute authenticated={authenticated} authData={authData} />
}
