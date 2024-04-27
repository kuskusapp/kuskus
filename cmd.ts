import * as child_process from "node:child_process"
import * as path from "node:path"

import { $ } from "bun"
import Watcher from "watcher"

// const filename = new URL(import.meta.url).pathname
// const root_path = path.dirname(filename)
// const api_path = path.join(root_path, "api")

async function main() {
  const args = Bun.argv
  const command = args[2]
  try {
    switch (command) {
    }
  } catch (err) {
    console.error("Error occurred:", err)
  }
}
