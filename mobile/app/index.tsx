import { SafeAreaView, StyleSheet, TextInput } from "react-native"
import { Container } from "~/components/Container"
import { observer, useObservable } from "@legendapp/state/react"
import { useState } from "react"

export default function Home() {
	const local = useObservable({
		email: "wow",
		password: "",
	})

	const [email, setEmail] = useState("")

	return (
		<>
			<Container>
				<SafeAreaView>
					<TextInput
						style={styles.input}
						onChangeText={(e) => {
							console.log(e, "e")
							console.log(e, "e")
							// local.email.set()
						}}
						// value={local.email.get()}
						value={email}
						placeholder="email"
					/>
					<TextInput
						style={styles.input}
						onChangeText={() => {}}
						value={local.password.get()}
						placeholder="password"
					/>
				</SafeAreaView>
			</Container>
		</>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
})

// TODO: what was in original template, remove it
// export default function Home() {
// 	return (
// 		<>
// 			<Stack.Screen options={{ title: "Home" }} />
// 			<Container>
// 				<ScreenContent path="app/index.tsx" title="Home" />
// 				<Link
// 					href={{ pathname: "/details", params: { name: "Some name" } }}
// 					asChild
// 				>
// 					<Button title="Show Details" />
// 				</Link>
// 			</Container>
// 		</>
// 	)
// }
