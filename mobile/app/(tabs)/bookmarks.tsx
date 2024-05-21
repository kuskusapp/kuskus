import { useScrollToTop } from "@react-navigation/native"
import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Button } from "react-native"
import * as WebBrowser from "expo-web-browser"
import { ThemedView } from "../../components/Themed"
import { theme } from "../../theme"
import { WebBrowserResult } from "expo-web-browser"

export default function Bookmarks() {
	const scrollRef = React.useRef<FlatList>(null)
	useScrollToTop(scrollRef)

	// const [result, setResult] = useState<WebBrowserResult | null>(null)

	// const _handlePressButtonAsync = async () => {
	// 	const result = await WebBrowser.openBrowserAsync(
	// 		"http://localhost:10702/db/edgedb/ext/auth/ui/signin?challenge=Yd2x9LYCEIx59ZBOV0Gwfnz47g9X6BLA4W5jke93VB0",
	// 	)
	// 	setResult(result)
	// }

	return (
		<ThemedView
			style={styles.container}
			darkColor={theme.colorDarkBlue}
			lightColor={theme.colorWhite}
		>
			{/* <Button
				title="Login"
				onPress={async () => {
					await _handlePressButtonAsync()
					console.log(result, "result")
				}}
			/> */}
		</ThemedView>
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
