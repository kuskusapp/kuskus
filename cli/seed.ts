// currently running commands inside assumes that user is already created through edgedb auth
// TODO: create it from seed.ts too

import { client } from "@/edgedb"
import {
	createGlobalState,
	createPlace,
	createPost,
} from "@/edgedb/crud/mutations"
import * as fs from "fs"
import * as path from "path"
import { create, get } from "ronin"
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
			case "places":
				await places()
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
	for (const image of images) {
		const roninPost = await get.post.with.fileNameFromImport(image.fileName)
		let imageDescription = await describeImage(image.buffer)

		if (roninPost) {
			const dbPost = await e
				.insert(e.Post, {
					imageUrl: roninPost.photo.src,
					roninId: roninPost.id,
					imageWidth: roninPost.photo.meta.width,
					imageHeight: roninPost.photo.meta.height,
					imagePreviewBase64Hash: roninPost.photo.placeholder.base64,
					aiDescription: imageDescription,
					imageFileNameFromImport: image.fileName,
					created_by: e.cast(e.User, e.uuid(userId)),
				})
				.run(client)
			console.log(dbPost, "db post added from existing ronin post")
		} else {
			const res = await create.post.with({
				photo: image.buffer,
				fileNameFromImport: image.fileName,
				aiDescription: imageDescription,
			})
			console.log(res, "ronin post added")
			const dbPost = await createPost.run(client, {
				imageUrl: res.photo.src,
				roninId: res.id,
				imageWidth: res.photo.meta.width,
				imageHeight: res.photo.meta.height,
				imagePreviewBase64Hash: res.photo.placeholder.base64,
				aiDescription: imageDescription,
				imageFileNameFromImport: image.fileName,
				userId: userId,
			})
			console.log(dbPost, "db post added with ronin post")
		}
	}
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

async function places() {
	// https://www.google.com/maps/place/Bułka+z+Masłem+Włodkowica/@51.1081905,17.0194183,17z/data=!4m14!1m7!3m6!1s0x470fc20b5c4619f3:0xdbffaddd63351490!2zQnXFgmthIHogTWFzxYJlbSBXxYJvZGtvd2ljYQ!8m2!3d51.1081872!4d17.0242892!16s%2Fg%2F12lrkbwpx!3m5!1s0x470fc20b5c4619f3:0xdbffaddd63351490!8m2!3d51.1081872!4d17.0242892!16s%2Fg%2F12lrkbwpx?entry=ttu
	await createPlace.run(client, {
		name: "bulka-s-maslem-wlodkowica",
		displayName: "Bułka z Masłem Włodkowica",
		location: "Wroclaw, Poland",
		profileImageUrl:
			"https://lh5.googleusercontent.com/p/AF1QipNc_A88yvJ1uJGvtC8X7MEczd32xFjeVIkWfB3R=w408-h408-k-no",
		bio: "Easygoing, plant-filled hangout with garden seating serving breakfast, burgers & homemade lemonades.",
		category: "restaurant",
		foodsAndDrinksServed: ["burger", "pasta", "coffee"],
		veganFriendly: true,
		quiet: false,
	})
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
