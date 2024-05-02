import e, { type $infer } from "../../dbschema/edgeql-js"

// context: https://discord.com/channels/841451783728529451/1235266238977150976 & https://discord.com/channels/841451783728529451/1235593775447937054
export const profileAuth = e.params(
  { userId: e.optional(e.uuid) },
  ({ userId }) => {
    // TODO: has bug https://discord.com/channels/841451783728529451/1235593775447937054/1235711795939774514
    // const user = e.op(e.cast(e.User, userId), "??", e.global.current_user)
    const user = e.op(
      e.cast(e.User, userId),
      "if",
      e.op("exists", userId),
      "else",
      e.global.current_user,
    )
    return e.select(user, () => ({
      name: true,
      bio: true,
      place: true,
      displayName: true,
      profilePhotoUrl: true,
      createdPosts: {
        photoUrl: true,
        description: true,
      },
    }))
  },
)

export type profileAuthReturn = $infer<typeof profileAuth>

export const profilePublic = e.params({ username: e.str }, ({ username }) => {
  return e.select(e.User, (u) => ({
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
})
export type profilePublicReturn = $infer<typeof profilePublic>
