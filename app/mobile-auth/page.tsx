import MobileAuth from "@/components/routes/MobileAuth"
import { PageProps } from "../[profile]/$types"

export default async function MobileAuthRoute({ params }: PageProps) {
	return (
		<>
			<MobileAuth />
		</>
	)
}
