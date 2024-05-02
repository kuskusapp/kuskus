import e from "@/dbschema/edgeql-js"
import { auth } from "@/edgedb-next-client"
import Image from "next/image"

export default async function Profile(props: any) {
  let session = auth.getSession()
  const client = session.client
  const authenticated = await session.isSignedIn()

  let authData
  let publicData

  if (authenticated) {
    authData = await e
      .select(e.Post, (post) => ({
        name: true,
        photoUrl: true,
        filter: e.op(post.created_by, "?=", e.global.current_user),
      }))
      .run(client)
  } else {
    publicData = await e
      .select(e.Post, (post) => ({
        name: true,
      }))
      .run(client)
  }

  return (
    <>
      {authData && (
        <header className="flex justify-between items-center pb-4">
          <div>Authenticated data:</div>
          {JSON.stringify(authData)}
          <Image
            src={"https://images.kuskus.app/github-profile"}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </header>
      )}
      {publicData && (
        <header className="flex justify-between items-center pb-4">
          <div>Public data:</div>
          {JSON.stringify(publicData)}
        </header>
      )}
    </>
  )
}
