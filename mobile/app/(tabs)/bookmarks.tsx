import { useScrollToTop } from "@react-navigation/native"
import React from "react"
import { StyleSheet } from "react-native"
import { ThemedView } from "@/components/Themed"
import { theme } from "@/theme"
import { FlatList } from "react-native-gesture-handler"

export default function Bookmarks() {
	const scrollRef = React.useRef<FlatList>(null)
	useScrollToTop(scrollRef)

	return (
		<ThemedView
			style={styles.container}
			darkColor={theme.colorDarkBlue}
			lightColor={theme.colorWhite}
		></ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	flatListContainer: {
		paddingTop: theme.space16,
	},
	bookmarks: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: theme.space24,
	},
})
