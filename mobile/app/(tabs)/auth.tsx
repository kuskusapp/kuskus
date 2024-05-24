import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Button, Text } from "react-native"
import * as SecureStore from "expo-secure-store"

export default function AuthRoute() {
	const local = useLocalSearchParams()
	const localToken = local.token as string

	// get token, do request to API, get a real token, use that for API calls..
	// secure store api
	useEffect(() => {
		console.log(localToken, "local token")
		if (localToken) {
			async function saveToken(token: string) {
				await save("token", token)
			}
			saveToken(localToken)
		}
	}, [localToken])

	return (
		<>
			<Text>Auth</Text>
			<Button
				title="Login"
				onPress={() => {
					console.log("runs..")
					fetch("http://localhost:3001/mobile-auth")
						.then((response) => response.json())
						.then((data) => {
							console.log("Success:", data)
						})
						.catch((error) => {
							console.error("Error:", error)
						})
				}}
			/>
		</>
	)
}

async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value)
}
