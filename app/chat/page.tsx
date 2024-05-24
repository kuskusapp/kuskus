import Chat from "@/components/routes/Chat"
import type { PageProps } from "./$types"

export default async function ChatRoute({ params }: PageProps) {
	return <Chat />
}
