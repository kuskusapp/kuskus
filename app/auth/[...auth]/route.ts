import { auth } from "@/edgedb-next-client"
import { redirect } from "next/navigation"
import { Octokit } from "octokit"

export const { GET, POST } = auth.createAuthRouteHandlers({
	async onBuiltinUICallback({ error, tokenData, isSignUp }) {
		if (error) {
			console.error("sign in failed", error)
		}
		if (!tokenData) {
			console.log("email verification required")
		}
		if (isSignUp) {
			const octokit = new Octokit({ auth: tokenData?.provider_token })
			const result = await octokit.request("GET /user", {
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			})
			const client = auth.getSession().client

			await client.query(`
        INSERT User {
          name := '',
          userRole := 'user',
					githubUsername := <optional str>$githubUsername,
					githubAvatarUrl := <optional str>$avatarUrl,
          identity := (global ext::auth::ClientTokenIdentity)
        }
      `)
		}
		redirect("/")
	},
	onSignout() {
		redirect("/")
	},
})
