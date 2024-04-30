import { createPost } from "@/edgedb/crud/mutations"

// const email = process.env.email!

async function seed() {
  // checkSeedDbConnection()
  const args = Bun.argv
  const command = args[2]
  try {
    switch (command) {
      // case "base":
      // 	await base()
      // 	break
      case "web":
        await web()
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

async function web() {
  await createPost(
    {
      photoUrl: "https://avatars.githubusercontent.com/u/6391776?v=4",
      description: "profile image",
    },
    "d6baa570-049a-11ef-b969-074fde013f53",
  )
}

// function checkSeedDbConnection() {
//   if (process.env.EDGEDB_DATABASE !== "seed") {
//     throw new Error("Seed db connection not set")
//   }
// }

await seed()
