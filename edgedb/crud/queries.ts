import { client } from "@/edgedb"
import e from "../../dbschema/edgeql-js"
import { edgedb } from "@/dbschema/edgeql-js/imports"

// https://discord.com/channels/841451783728529451/1235266238977150976 useful context in making the query
export async function profileAuth(
  userId?: string | null,
  clientPassed?: edgedb.Executor,
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

export async function profilePublic(
  userId?: string | null,
  clientPassed?: edgedb.Executor,
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
