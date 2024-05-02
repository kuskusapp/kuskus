import { CloudflareR2Client } from "cloudflare-r2-edge"

// TODO: delete from R2

// TODO: should be from passed in data, not from url (or at least not only url)
export async function addPostForUser(
  url: string,
  username: string,
  postId: string,
) {
  const r2Client = new CloudflareR2Client({
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    bucket: process.env.CLOUDFLARE_BUCKET!,
  })

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Network response was not ok")

    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    // TODO: either fork https://github.com/maccman/cloudflare-r2-edge to support ArrayBuffer
    // or make own package that also includes delete from R2
    // @ts-ignore
    await r2Client.put(`${username}-post-${postId}`, arrayBuffer)
  } catch (error) {
    console.error("Error fetching the image:", error)
  }
}

// TODO: should be from passed in data, not from url (or at least not only url)
export async function editProfileImageOfUser(url: string, username: string) {
  const r2Client = new CloudflareR2Client({
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    bucket: process.env.CLOUDFLARE_BUCKET!,
  })

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Network response was not ok")

    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    // TODO: either fork https://github.com/maccman/cloudflare-r2-edge to support ArrayBuffer
    // or make own package that also includes delete from R2
    // TODO: in case of clash, do edit over it with new image
    // @ts-ignore
    await r2Client.put(`${username}-profile-image`, arrayBuffer)
  } catch (error) {
    console.error("Error fetching the image:", error)
  }
}
