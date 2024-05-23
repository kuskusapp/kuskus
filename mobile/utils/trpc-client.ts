import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import * as SecureStore from "expo-secure-store"
import type { AppRouter } from "../app/trpc+api"

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "/trpc",
			async headers() {
				return {
					authorization: await getValueFor("token"),
				}
			},
		}),
	],
})

export const TrpcProvider = trpc.Provider

async function getValueFor(key: string) {
	let result = await SecureStore.getItemAsync(key)
	if (result) {
		return result
	} else {
		console.log("not auth'd")
		// TODO: go to /auth
	}
}
