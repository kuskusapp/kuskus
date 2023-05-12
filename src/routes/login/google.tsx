import { GraphQLClient } from "graphql-request"
import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import {
  UserDetailsCreateDocument,
  UserDetailsDocument,
} from "~/graphql/schema"
import { GoogleClient, getUser } from "~/lib/auth"

export default function GoogleCallback() {
  const navigate = useNavigate()

  onMount(async () => {
    await GoogleClient.signinCallback().catch((error) => {
      console.error(error)
      return
    })

    const user = await getUser()
    const token = user?.id_token

    const client = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    // TODO: does not look good but is needed for stripe to work
    // we need to have userDetails to 100% be present in resolver
    // the id from userDetails is our way to identify the user
    const userDetails = await client.request(UserDetailsDocument)
    // TODO: why possibly undefined?
    if (userDetails.userDetailsCollection?.edges?.length > 0) {
      navigate("/")
      return
    }
    // crete empty userDetails if it does not exist
    await client.request(UserDetailsCreateDocument, {
      userDetails: {},
    })
    navigate("/")
  })
  return <></>
}
