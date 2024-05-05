"use server"

import { z } from "zod"
import { actionClient } from "@/lib/safe-action"
import { updateUser } from "@/edgedb/crud/mutations"
import { auth } from "@/edgedb-next-client"

const schema = z.object({
  bio: z.string().optional(),
  place: z.string().optional(),
  displayName: z.string().optional(),
})

export const updateUserAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { bio, place, displayName } }) => {
    const session = auth.getSession()
    const client = session.client
    try {
      await updateUser.run(client, { bio, place, displayName })
    } catch {
      // TODO: consider better errors
      return { failure: "Error with EdgeDB" }
    }
  })
