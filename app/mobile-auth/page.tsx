// TODO: not sure why this import but it works
import { PageProps } from "../[profile]/$types"

// TODO: make mobile auth work
export default async function MobileAuth({ params }: PageProps) {
	// TODO: below should run in client component
	// const cookie = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith("edgedb-cookie="))
	// const edgedbCookieValue = cookie ? cookie.split("=")[1] : null
	// console.log("edgedb-cookie:", edgedbCookieValue)

	return <></>
}
