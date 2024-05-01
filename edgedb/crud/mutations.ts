import { client } from "@/edgedb"
import e from "../../dbschema/edgeql-js"
import { edgedb } from "@/dbschema/edgeql-js/imports"

export async function createPost(
  data: {
    photoUrl: string
    description: string
  },
  userId?: string | null,
  clientPassed?: edgedb.Executor,
) {
  return await e
    .insert(e.Post, {
      name: "test",
      description: data.description,
      photoUrl: data.photoUrl,
      created_by: userId
        ? e.cast(e.User, e.uuid(userId))
        : e.cast(e.User, e.set()),
    })
    .run(client)
}
