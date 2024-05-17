import createAuth from "@edgedb/auth-nextjs/app"
import { client } from "./edgedb"

export const auth = createAuth(client, {
	baseUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:3001/"
			: "https://kuskus.vercel.app/",
})
