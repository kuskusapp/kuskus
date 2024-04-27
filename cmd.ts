import { $ } from "bun"
import Watcher from "watcher"

async function main() {
  const args = Bun.argv
  const command = args[2]
  try {
    switch (command) {
      case "runGrafbase":
        await runGrafbase()
        break
    }
  } catch (err) {
    console.error("Error occurred:", err)
  }
}

async function runGrafbase() {
  console.log("run grafbase")
}

await main()
