import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import { useGlobalContext } from "~/GlobalContext/store"
import { GoogleClient, getUser } from "~/lib/auth"

export default function GoogleCallback() {
  const global = useGlobalContext()
  const navigate = useNavigate()
  onMount(async () => {
    await GoogleClient.signinCallback().catch((error) => {
      console.error(error)
      return null
    })
    const user = await getUser()
    global.userState.checkUser(user?.profile.aud as string)
    // navigate("/")
  })
  return <></>
}
