import { auth } from "@/edgedb-next-client"
import { redirect } from "next/navigation"
import { Octokit } from "@octokit/core"

export const { GET, POST } = auth.createAuthRouteHandlers({
	async onBuiltinUICallback({ error, tokenData, isSignUp }, req) {
		console.log(req.headers, "req.headers")
		console.log(error, "error")
		console.log(tokenData, "tokenData")
		console.log(isSignUp, "isSignUp")

		if (error) {
			console.error("sign in failed", error)
		}
		if (!tokenData) {
			console.log("email verification required")
		}
		if (isSignUp) {
			if (process.env.NODE_ENV === "production") {
				const octokit = new Octokit({ auth: tokenData?.provider_token })
				const result = await octokit.request("GET /user", {
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				})
				const client = auth.getSession().client

				await client.query(
					`
					INSERT User {
						name := <optional str>$name,
						email := <optional str>$email,
						githubUsername := <optional str>$githubUsername,
						githubAvatarUrl := <optional str>$avatarUrl,
						userRole := 'user',
						identity := (global ext::auth::ClientTokenIdentity)
					}
				`,
					{
						name: result?.data?.name,
						email: result?.data?.name,
						githubUsername: result?.data?.login,
						githubAvatarUrl: result?.data?.avatar_url,
					},
				)
			} else {
				// TODO: only here because GitHub auth breaks down locally for some reason
				const client = auth.getSession().client

				const emailData = await client.querySingle<{ email: string }>(`
					SELECT ext::auth::EmailFactor {
						email
					} FILTER .identity = (global ext::auth::ClientTokenIdentity)
				`)

				await client.query(`
					INSERT User {
						name := '',
						email := '${emailData?.email}',
						userRole := 'user',
						identity := (global ext::auth::ClientTokenIdentity)
					}
				`)
			}
		}
		redirect("/")
	},
	onSignout() {
		redirect("/")
	},
})
