import e, { type $infer } from "../../dbschema/edgeql-js"
import { edgedb } from "@/dbschema/edgeql-js/imports"

const profileQuery = e.params({ userId: e.optional(e.uuid) }, ({ userId }) => {
  const user = e.op(userId, "??", e.global.current_user)
  return e.select(user, () => ({
    name: true,
    bio: true,
    place: true,
    profilePhotoUrl: true,
    createdPosts: {
      photoUrl: true,
      description: true,
    },
  }))
})

export type AuthenticatedProfile = $infer<typeof profileShape>

// https://discord.com/channels/841451783728529451/1235266238977150976 useful context in making the query
export async function profileAuth(
  client: edgedb.Executor,
  userId?: string | null,
) {
  return await profileQuery(client, { userId: userId ?? null })
}

// export async function profilePublic(username: string) {
//   return await e
//     .select(e.User, (u) => ({
//       filter: e.op(u.name, "=", username),
//       name: true,
//       bio: true,
//       place: true,
//       profilePhotoUrl: true,
//       createdPosts: {
//         photoUrl: true,
//         description: true,
//       },
//     }))
//     .run(client)
// }
