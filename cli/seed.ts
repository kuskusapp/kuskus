const email = process.env.email!

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

// async function base() {
// 	await deleteUser(email)
// 	await createUser(process.env.email!)
// }

async function web() {
  // await base()
}

function checkSeedDbConnection() {
  if (process.env.EDGEDB_DATABASE !== "seed") {
    throw new Error("Seed db connection not set")
  }
}
