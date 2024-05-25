import Settings from "@/components/routes/Settings"
import { auth } from "@/edgedb-next-client"

export default async function SettingsRoute() {
	const session = auth.getSession()
	const authenticated = await session.isSignedIn()
	return <Settings authenticated={authenticated} />
}
