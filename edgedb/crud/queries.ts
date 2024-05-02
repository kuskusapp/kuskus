import { client } from "@/edgedb"
import e from "../../dbschema/edgeql-js"
import { edgedb } from "@/dbschema/edgeql-js/imports"

// https://discord.com/channels/841451783728529451/1235266238977150976 useful context in making the query
export async function profileAuth(
  client: edgedb.Executor,
  userId?: string | null,
) {
  const user = userId
    ? e.cast(e.User, e.uuid(userId))
    : e.select(e.global.current_user)

  return await e
    .select(user, (u) => ({
      name: true,
      bio: true,
      place: true,
      profilePhotoUrl: true,
      createdPosts: {
        photoUrl: true,
        description: true,
      },
    }))
    .run(client)
}

export async function profilePublic(username: string) {
  return await e
    .select(e.User, (u) => ({
      filter: e.op(u.name, "=", username),
      name: true,
      bio: true,
      place: true,
      profilePhotoUrl: true,
      createdPosts: {
        photoUrl: true,
        description: true,
      },
    }))
    .run(client)
}
