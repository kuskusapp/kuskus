import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Text } from "react-native"

export default function AuthRoute() {
	const local = useLocalSearchParams()
	const localToken = local.token

	// get token, do request to API, get a real token, use that for API calls..
	// secure store api
	useEffect(() => {
		console.log(localToken, "localToken")
	}, [localToken])

	return (
		<>
			<Text>Auth</Text>
		</>
	)
}
