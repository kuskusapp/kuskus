import { initTRPC } from "@trpc/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.create()

const appRouter = t.router({
	greeting: t.procedure.query(() => "hello tRPC v10!"),
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/trpc",
		req,
		router: appRouter,
		createContext: () => ({
			//
		}),
	})

export { handler as GET, handler as POST }
