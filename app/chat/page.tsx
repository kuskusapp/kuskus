import ChatRoute from "@/components/routes/ChatRoute"
import type { PageProps } from "./$types"
import { auth } from "@/edgedb-next-client"

export default async function Chat({ params }: PageProps) {
	const session = auth.getSession()
	const authenticated = await session.isSignedIn()
	return <ChatRoute authenticated={authenticated} />
}
