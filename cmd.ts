import { $ } from "bun"

async function main() {
	const args = Bun.argv
	const command = args[2]
	try {
		switch (command) {
			case "setup":
				await setup()
				break
		}
	} catch (err) {
		console.error("Error occurred:", err)
	}
}

async function setup() {
	await $`git clone https://github.com/kuskusapp/seed cli/seed`
}

await main()
