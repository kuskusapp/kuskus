import Home from "@/components/Home"
import { auth } from "@/edgedb-next-client"
import { homeAuth, homeAuthReturn, homePublic } from "@/edgedb/crud/queries"

export default async function HomeRoute() {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()
	const authBuiltinUiUrl = auth.getBuiltinUIUrl()
	const autBuiltinSignupUrl = auth.getBuiltinUISignUpUrl()

	const publicData = await homePublic.run(client)
	let authData = null as homeAuthReturn | null
	if (authenticated) {
		authData = await homeAuth.run(client, {})
	}

	return (
		<Home
			publicData={publicData}
			authData={authData}
			authenticated={authenticated}
			authBuiltinUiUrl={authBuiltinUiUrl}
			authBuiltinSignupUrl={autBuiltinSignupUrl}
		/>
	)
}
