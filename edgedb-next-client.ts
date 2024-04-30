import createAuth from "@edgedb/auth-nextjs/app"
import { client } from "./edgedb"

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3001",
})
