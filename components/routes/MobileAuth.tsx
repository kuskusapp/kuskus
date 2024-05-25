// TODO: WIP route to figure out mobile auth with Expo + EdgeDB
"use client"
import { observer, useObservable } from "@legendapp/state/react"

export default observer(function MobileAuth() {
	const local = useObservable({
		token: "",
		clicked: false,
	})

	// useEffect(() => {
	// 	const tokenFromCookie = document.cookie
	// 		.split("; ")
	// 		.find((row) => row.startsWith("edgedb-session="))
	// 		?.split("=")[1]
	// 	local.token.set(tokenFromCookie)
	// 	window.location.href = `kuskus://auth?token=secret`
	// 	// if (local.token.get()) {
	// 	// 	window.location.href = `kuskus://auth?token=${local.token.get()}`
	// 	// }
	// }, [])
	return <></>
})
