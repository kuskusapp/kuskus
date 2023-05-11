import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
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

    // no token probably means sign in failed or user cancelled
    // TODO: should not just navigate to home page
    // but should show an error message pop up
    if (!token) {
      navigate("/")
      return null
    }
    navigate("/")
    return null
  })
  return <></>
}
