import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Text } from "react-native"
import * as SecureStore from "expo-secure-store"

export default function AuthRoute() {
	const local = useLocalSearchParams()
	const localToken = local.token

	// get token, do request to API, get a real token, use that for API calls..
	// secure store api
	useEffect(() => {
		async function saveToken() {
			await save("token", "secret")
		}
		saveToken()
	}, [localToken])

	return (
		<>
			<Text>Auth</Text>
		</>
	)
}

async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value)
}
