import { useScrollToTop } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { ThemedView, useThemeColor } from "@/components/Themed"
import { theme } from "@/theme"
import { ScrollView } from "react-native-gesture-handler"

export default function Info() {
	const backgroundColor = useThemeColor({
		light: theme.colorWhite,
		dark: theme.colorDarkBlue,
	})
	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<ThemedView style={[styles.container, { backgroundColor }]}>
			<ScrollView style={styles.scrollView} ref={ref}></ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
})
