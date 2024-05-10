// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import { createPost } from "@/edgedb/crud/mutations"
import e from "../dbschema/edgeql-js"

const userId = process.env.USER_ID!

async function seed() {
  // checkSeedDbConnection()
  const args = Bun.argv
  const command = args[2]
  try {
    switch (command) {
      // TODO: create user here
      // case "base":
      // 	await base()
      // 	break
      case "web":
        await web()
        break
      case "home":
        await home()
        break
      case "profile":
        await profile()
        break
      case "place":
        await place()
        break
      case "posts":
        await posts()
        break
      case "clear":
        await clear()
        break
      case undefined:
        console.log("No command provided")
        break
      default:
        console.log("Unknown command")
        break
    }
    console.log("done")
  } catch (err) {
    console.error("Error occurred:", err)
  }
}

// /{name}
async function profile() {
  await e
    .update(e.User, (user) => ({
      filter_single: { id: userId },
      set: {
        name: "nikiv",
        displayName: "Nikita",
        place: "Tbilisi, Georgia",
        bio: "Make kuskus.app",
        profilePhotoUrl: "https://images.kuskus.app/nikiv-profile-image",
      },
    }))
    .run(client)
}

//
async function home() {
  // await e
  //   .update(e.User, (user) => ({
  //     filter_single: { id: userId },
  //     set: {
  //       name: "nikiv",
  //       displayName: "Nikita",
  //       place: "Tbilisi, Georgia",
  //       bio: "Make kuskus.app",
  //       profilePhotoUrl: "https://images.kuskus.app/nikiv-profile-image",
  //     },
  //   }))
  //   .run(client)
}

async function place() {
  await e
    .insert(e.Place, {
      name: "pulp",
      displayName: "Pulp",
      bio: "Cafe in Tbilisi, Georgia",
      category: "cafe",
      profilePhoto: "https://images.kuskus.app/nikiv-profile-image",
    })
    .run(client)
}

// adds some image posts to user
async function posts() {
  await createPost(
    {
      photoUrl: "https://images.kuskus.app/nikiv-post-1",
    },
    userId,
  )
  await createPost(
    {
      photoUrl: "https://images.kuskus.app/nikiv-post-2",
    },
    userId,
  )
}

async function web() {
  await createPost(
    {
      photoUrl: "https://avatars.githubusercontent.com/u/6391776?v=4",
      description: "profile image",
    },
    "d6baa570-049a-11ef-b969-074fde013f53",
  )
}

// TODO: add more, make configurable
async function clear() {
  await e.delete(e.Post).run(client)
}

// function checkSeedDbConnection() {
//   if (process.env.EDGEDB_DATABASE !== "seed") {
//     throw new Error("Seed db connection not set")
//   }
// }

await seed()
