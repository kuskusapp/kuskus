import Home from "@/components/Home"
import { auth } from "@/edgedb-next-client"
import { homePublic } from "@/edgedb/crud/queries"

export default async function HomeRoute() {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	const data = await homePublic.run(client)

	const authBuiltinUiUrl = auth.getBuiltinUIUrl()
	const autBuiltinSignupUrl = auth.getBuiltinUISignUpUrl()

	return (
		<Home
			data={data}
			authenticated={authenticated}
			authBuiltinUiUrl={authBuiltinUiUrl}
			autBuiltinSignupUrl={autBuiltinSignupUrl}
		/>
	)
}
