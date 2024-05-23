// TODO: not sure why this import but it works
import MobileAuth from "@/components/routes/MobileAuth"
import { PageProps } from "../[profile]/$types"

// TODO: make mobile auth work
export default async function MobileAuthRoute({ params }: PageProps) {
	return (
		<>
			<MobileAuth />
		</>
	)
}
