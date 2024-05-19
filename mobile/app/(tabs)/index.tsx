import { ThemedView } from "@/components/Themed"
import React from "react"
import { ScrollView, StyleSheet } from "react-native"

export default function Schedule() {
	return (
		<ThemedView style={styles.container}>
			<ScrollView></ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
	},
})
