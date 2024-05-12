// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import { createGlobalState, createPost } from "@/edgedb/crud/mutations"
import e from "../dbschema/edgeql-js"
import * as path from "path"
import * as fs from "fs"
import { create } from "ronin"
import type { Post } from "@ronin/kus"

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
      case "clearPosts":
        await clearPosts()
        break
      case "query":
        await query()
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
  let image = await getFileRelativeToCurrentFolderAsNodeBuffer(
    "seed-images/nikiv-post-lovely-breakfast.jpg",
  )
  const imageDescription = await describeImage(image)
  console.log(imageDescription)
  return
  const res = await create.post.with({
    photo: image as any,
  })
  let roninImageUrl = res.photo.src
  // let roninImageUrl = ".."
  if (roninImageUrl) {
    await createPost.run(client, {
      // photoUrl: res.id,
      photoUrl: "..",
      aiDescription: imageDescription,
      userId: userId,
    })
  }
}

async function describeImage(imageBlob: any) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
      },
      method: "POST",
      body: imageBlob,
    },
  )
  const result = await response.json()
  return result[0].generated_text
}

async function web() {
  // await createPost(
  //   {
  //     photoUrl: "https://avatars.githubusercontent.com/u/6391776?v=4",
  //     description: "profile image",
  //   },
  //   "d6baa570-049a-11ef-b969-074fde013f53",
  // )
}

async function clearPosts() {
  await e.delete(e.Post).run(client)
}

function checkThatNotRunningInProduction() {
  if (process.env.EDGEDB_INSTANCE === "nikitavoloboev/kuskus") {
    throw new Error(
      "Connected to production DB, don't run these seed commands on it",
    )
  }
}

// TODO: move functions to ts-utils & import them
function getFileRelativeToCurrentFolder(relativePath: string) {
  return Bun.file(path.join(import.meta.dirname, relativePath))
}
function getFileRelativeToCurrentFolderAsNodeBuffer(relativePath: string) {
  return fs.readFileSync(path.join(import.meta.dirname, relativePath))
}

await seed()
