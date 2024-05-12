// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import { createGlobalState, createPost } from "@/edgedb/crud/mutations"
import e from "../dbschema/edgeql-js"
import * as path from "path"
import { create } from "ronin"

const userId = process.env.USER_ID!

async function seed() {
  checkThatNotRunningInProduction()
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
      case "homePublic":
        await homePublic()
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
    .update(e.User, () => ({
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

async function homePublic() {
  await createGlobalState.run(client, {
    popularDishes: [
      "Coffee",
      "Smoothie",
      "Pasta",
      "Ramen",
      "Tacos",
      "Steak",
      "Curry",
      "Pizza",
      "Sushi",
      "Burger",
      "Salad",
    ],
  })
}

async function place() {
  await e
    .insert(e.Place, {
      name: "pulp",
      displayName: "Pulp",
      bio: "Cafe in Tbilisi, Georgia",
      category: "cafe",
      profilePhotoUrl: "https://images.kuskus.app/nikiv-profile-image",
    })
    .run(client)
}

// adds some image posts to user
async function posts() {
  let imageBlob = await getFileRelativeToCurrentFolder(
    import.meta.dirname,
    "seed-images/nikiv-post-lovely-breakfast.jpg",
  )
  const res = await create.post.with({
    photo: imageBlob,
  })
  console.log(res, "res")
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

function checkThatNotRunningInProduction() {
  if (process.env.EDGEDB_INSTANCE === "nikitavoloboev/kuskus") {
    throw new Error(
      "Connected to production DB, don't run these seed commands on it",
    )
  }
}

await seed()

// currentFilePath has to be import.meta.url
export async function getFileRelativeToCurrentFolder(
  directoryPath: string,
  relativePath: string,
) {
  const absolutePath = path.join(directoryPath, relativePath)
  const file = Bun.file(absolutePath)
  return await file
}
