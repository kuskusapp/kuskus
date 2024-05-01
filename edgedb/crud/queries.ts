import { client } from "@/edgedb"
import e from "../../dbschema/edgeql-js"
import { edgedb } from "@/dbschema/edgeql-js/imports"

// name, prettyName, city, description, [Posts]
export async function profileAuth(
  userId?: string | null,
  clientPassed?: edgedb.Executor,
) {
  await e
    .select(e.Post, (post) => ({
      name: true,
      photoUrl: true,
      filter: e.op(post.created_by, "?=", e.cast(e.User, e.uuid(userUuid))),
    }))
    .run(client)
}
