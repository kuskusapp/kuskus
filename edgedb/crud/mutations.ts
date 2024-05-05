import e from "../../dbschema/edgeql-js"

export async function createPost(
  data: {
    photoUrl: string
    description?: string
  },
  userId?: string | null,
) {
  return await e.insert(e.Post, {
    photoUrl: data.photoUrl,
    description: data.description,
    created_by: userId
      ? e.cast(e.User, e.uuid(userId))
      : e.cast(e.User, e.set()),
  })
}

export const updateUser = e.params(
  {
    userId: e.optional(e.uuid),
    bio: e.optional(e.str),
    place: e.optional(e.str),
    displayName: e.optional(e.str),
  },
  ({ userId, bio, place, displayName }) => {
    const user = e.op(
      e.cast(e.User, userId),
      "if",
      e.op("exists", userId),
      "else",
      e.global.current_user,
    )

    return e.update(user, (u) => ({
      set: {
        bio: e.op(bio, "??", u.bio),
        place: e.op(place, "??", u.place),
        displayName: e.op(displayName, "??", u.displayName),
      },
    }))
  },
)
