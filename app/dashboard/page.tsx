import e from "@/dbschema/edgeql-js"
import { auth } from "@/edgedb-next-client"

export default async function Home() {
	let session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	let authData
	let publicData

	if (authenticated) {
		authData = await e
			.select(e.Item, (_item) => ({
				id: true,
			}))
			.run(client)
	} else {
		publicData = await e
			.select(e.Item, (_item) => ({
				name: true,
			}))
			.run(client)
	}

	return (
		<>
			{authData && (
				<header className="flex justify-between items-center pb-4">
					<div>Authenticated data:</div>
					{JSON.stringify(authData)}
				</header>
			)}
			{publicData && (
				<header className="flex justify-between items-center pb-4">
					<div>Public data:</div>
					{JSON.stringify(publicData)}
				</header>
			)}
		</>
	)
}
