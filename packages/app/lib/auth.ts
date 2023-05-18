import { UserManager } from "oidc-client-ts"

// TODO: cors issue with github token endpoint, need proxy?
// export const GithubClient = new UserManager({
//   authority: "https://token.actions.githubusercontent.com",
//   metadataSeed: {
//     authorization_endpoint: "https://github.com/login/oauth/authorize",
//     token_endpoint: "https://github.com/login/oauth/access_token",
//   },
//   client_id: import.meta.env.VITE_GITHUB_ID as string,
//   client_secret: import.meta.env.VITE_GITHUB_SECRET as string,
//   redirect_uri: "https://localhost:3000",
// })

export const GoogleClient = new UserManager({
  authority: "https://accounts.google.com",
  client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  client_secret: import.meta.env.VITE_GOOGLE_SECRET as string,
  redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI as string,
  metadataSeed: {
    end_session_endpoint: "https://www.google.com/accounts/logout",
    issuer: "https://accounts.google.com",
  },
  scope: "openid profile",
})

export async function getUser() {
  return await GoogleClient.getUser()
}
