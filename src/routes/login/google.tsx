import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import { createGrafbaseClient } from "~/GlobalContext/global"
import { UserCreateDocument, UserExistsDocument } from "~/graphql/schema"
import { GoogleClient, getUser } from "~/lib/auth"

export default function GoogleCallback() {
  const navigate = useNavigate()
  onMount(async () => {
    await GoogleClient.signinCallback().catch((error) => {
      console.error(error)
      return null
    })

    const user = await getUser()
    const token = user?.id_token

    if (!token) {
      navigate("/")
      return null
    }

    const grafbaseClient = createGrafbaseClient(token)

    if (grafbaseClient) {
      try {
        // check if user already exists in db with this audienceToken
        const foundUser = await grafbaseClient.request(UserExistsDocument, {
          audienceToken: user?.profile.aud as string,
        })
        let id = foundUser?.user?.id
        // if user is not found in db, create user
        if (!id) {
          await grafbaseClient.request(UserCreateDocument, {
            user: {
              audienceToken: user?.profile.aud as string,
            },
          })
          navigate("/")
        }
      } catch (error) {
        navigate("/")
      }
    }
  })
  return <></>
}
