// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import { createGlobalState, createPost } from "@/edgedb/crud/mutations"
import * as fs from "fs"
import * as path from "path"
import e from "../dbschema/edgeql-js"

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
  let testImage = images[2]
  // console.log(testImage, "test image")
  // let imageDescription = await describeImage(testImage.buffer)
  // console.log(testImage.fileName)
  // console.log(imageDescription, "description")
  // return
  // const promises = images.map(async (image) => {
  //   let imageDescription = await describeImage(image.buffer)
  //   console.log(image.fileName)
  //   console.log(imageDescription)
  // })
  // await Promise.all(promises)
  // return
  // const res = await create.post.with({
  //   photo: testImage.buffer,
  // })
  // console.log(res, "res")
  // let roninImageUrl = res.photo.src
  // // let roninImageUrl = ".."
  // if (roninImageUrl) {
  //   await createPost.run(client, {
  //     // photoUrl: res.id,
  //     photoUrl: "..",
  //     aiDescription: imageDescription,
  //     userId: userId,
  //   })
  // }
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
