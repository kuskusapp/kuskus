// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import { createGlobalState, createPost } from "@/edgedb/crud/mutations"
import * as fs from "fs"
import * as path from "path"
import e from "../dbschema/edgeql-js"
import { create, drop, get } from "ronin"

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
  const images = readJPGFilesFromFolder("seed/foods")
  const promises = images.map(async (image) => {
    const roninPost = await get.post.with.fileName(image.fileName)
    let imageDescription = await describeImage(image.buffer)

    if (roninPost) {
      await e
        .insert(e.Post, {
          photoUrl: roninPost.photo.src,
          roninId: roninPost.id,
          photoFileName: image.fileName,
          aiDescription: imageDescription,
          created_by: e.cast(e.User, e.uuid(userId)),
        })
        .run(client)
    } else {
      const res = await create.post.with({
        photo: image.buffer,
        fileName: image.fileName,
        aiDescription: imageDescription,
      })
      await createPost.run(client, {
        photoUrl: res.photo.src,
        roninId: res.id,
        photoFileName: image.fileName,
        aiDescription: imageDescription,
        userId: userId,
      })
    }
  })
  await Promise.all(promises)
}

async function describeImage(imageBlob: any) {
  try {
    const response = await fetch(
      // "https://api-inference.huggingface.co/models/unum-cloud/uform-gen",
      "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        },
        method: "POST",
        body: imageBlob,
      },
    )

    if (!response.ok) {
      console.error("Failed to fetch:", response.status, response.statusText)
      return "Error fetching image description"
    }

    const result = await response.json()
    if (!result || result.length === 0 || !result[0].generated_text) {
      console.error("Unexpected response format:", result)
      return "Unexpected response format"
    }

    return result[0].generated_text
  } catch (error) {
    console.error("Error in describeImage:", error)
    return "Error processing image description"
  }
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
  const posts = await getPostsByUser(userId)
  console.log(posts)
  // posts.map(async (post) => {
  //   await drop.post.with.id(post.photoId)
  // })
  // await e.delete(e.Post).run(client)
}

function checkThatNotRunningInProduction() {
  if (process.env.EDGEDB_INSTANCE === "nikitavoloboev/kuskus") {
    throw new Error(
      "Connected to production DB, don't run these seed commands on it",
    )
  }
}

async function getPostsByUser(userId: string) {
  const posts = await e
    .select(e.Post, (post) => ({
      photoUrl: true,
      roninId: true,
      filter: e.op(post.created_by.id, "=", e.uuid(userId)),
    }))
    .run(client)
  return posts
}

// TODO: move functions to ts-utils & import them
function getFileRelativeToCurrentFolder(relativePath: string) {
  return Bun.file(path.join(import.meta.dirname, relativePath))
}
function getFileRelativeToCurrentFolderAsNodeBuffer(relativePath: string) {
  return fs.readFileSync(path.join(import.meta.dirname, relativePath))
}
function readJPGFilesFromFolder(
  folderPath: string,
): { fileName: string; buffer: Buffer }[] {
  const directoryPath = path.join(import.meta.dirname, folderPath)
  const files = fs.readdirSync(directoryPath)
  const jpgFiles = files
    .filter((file) => file.endsWith(".jpg"))
    .map((jpgFile) => ({
      fileName: jpgFile,
      buffer: getFileRelativeToCurrentFolderAsNodeBuffer(
        path.join(folderPath, jpgFile),
      ),
    }))
  return jpgFiles
}

await seed()
