import ProfileAuth from "@/components/routes/ProfileAuth"
import ProfilePublic from "@/components/routes/ProfilePublic"
import { auth } from "@/edgedb-next-client"
import { profileAuth, profilePublic } from "@/edgedb/crud/queries"

export default async function Profile({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  let session = auth.getSession()
  const client = session.client
  const authenticated = await session.isSignedIn()

  const authData = authenticated ? await profileAuth.run(client, {}) : null
  const publicData = !authenticated
    ? await profilePublic.run(client, params.profile)
    : null

  return (
    <>
      {authData && <ProfileAuth data={authData} />}
      {publicData && <ProfilePublic data={publicData} />}
    </>
  )
}
