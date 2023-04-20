import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import { GoogleClient } from "~/lib/auth"

export default function GoogleCallback() {
  const navigate = useNavigate()
  onMount(async () => {
    await GoogleClient.signinCallback().catch((error) => {
      console.error(error)
      return null
    })
    navigate("/")
  })
  return <></>
}
