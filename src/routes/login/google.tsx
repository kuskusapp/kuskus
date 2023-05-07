import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import { useGlobal } from "~/GlobalContext/global"
import { UserCreateDocument, UserExistsDocument } from "~/graphql/schema"
import { GoogleClient, getUser } from "~/lib/auth"

export default function GoogleCallback() {
  const global = useGlobal()

  const navigate = useNavigate()
  onMount(async () => {
    await GoogleClient.signinCallback().catch((error) => {
      console.error(error)
      return null
    })

    const user = await getUser()

    global.setState("googleUser", user)

    const grafbase = global.grafbase()

    if (grafbase) {
      // check does the user already exist given the audience token
      const foundUser = await grafbase.request(UserExistsDocument, {
        audienceToken: user?.profile.aud as string,
      })

      let id = foundUser?.user?.id

      if (!id) {
        // create user in grafbase
        const res = await grafbase.request(UserCreateDocument, {
          user: {
            audienceToken: user?.profile.aud as string,
          },
        })
        id = res?.userCreate?.user?.id
      }

      if (id) global.setState("user", { id })

      navigate("/")
    } else {
      navigate("/auth")
    }
  })
  return <></>
}
