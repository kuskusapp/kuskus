import { observer, useObservable } from "@legendapp/state/react"
import { SafeAreaView, StyleSheet, TextInput } from "react-native"

import { Container } from "~/components/Container"

export default observer(function Home() {
	const local = useObservable({
		email: "",
		password: "",
	})

	return (
		<>
			<Container>
				<SafeAreaView>
					<TextInput
						style={styles.input}
						onChangeText={(e) => {
							local.email.set(e)
						}}
						value={local.email.get()}
						placeholder="email"
					/>
					<TextInput
						style={styles.input}
						onChangeText={(e) => {
							local.password.set(e)
						}}
						value={local.password.get()}
						placeholder="password"
					/>
				</SafeAreaView>
			</Container>
		</>
	)
})

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
})
