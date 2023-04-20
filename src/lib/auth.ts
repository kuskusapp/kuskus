import { UserManager } from "oidc-client-ts"

// TODO: cors issue with github token endpoint, need proxy?
export const GithubClient = new UserManager({
  authority: "https://token.actions.githubusercontent.com",
  metadataSeed: {
    authorization_endpoint: "https://github.com/login/oauth/authorize",
    token_endpoint: "https://github.com/login/oauth/access_token",
  },
  client_id: process.env.GITHUB_ID as string,
  client_secret: process.env.GITHUB_SECRET as string,
  redirect_uri: "https://localhost:3000",
})

export const GoogleClient = new UserManager({
  authority: "https://accounts.google.com",
  client_id: process.env.GOOGLE_CLIENT_ID as string,
  client_secret: process.env.GOOGLE_SECRET as string,
  redirect_uri: "http://localhost:3000/login/google",
  metadataSeed: {
    end_session_endpoint: "https://www.google.com/accounts/logout",
  },
  scope: "openid profile",
})

export async function getUser() {
  return await GoogleClient.getUser()
}
