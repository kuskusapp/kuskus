import { auth } from "@/edgedb-next-client"
import type { PageProps } from "./$types"
import ChatAuth from "@/components/routes/ChatAuth"

export default async function Chat({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	return <ChatAuth data={""} />
}
