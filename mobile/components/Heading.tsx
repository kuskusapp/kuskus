import { Image, View, StyleSheet } from "react-native"

import { ThemedText } from "./Themed"
import { theme } from "../theme"

const DESERT_SIZE = 100

export function Heading() {
	return (
		<View style={styles.heading}>
			<Image
				style={styles.image}
				source={require("../assets/images/desert.png")}
			/>
			<View>
				<ThemedText
					marginBottom={theme.space8}
					fontSize={theme.fontSize32}
					fontWeight="bold"
				>
					KusKus
				</ThemedText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		width: DESERT_SIZE,
		height: DESERT_SIZE,
	},
	heading: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: theme.space12,
	},
})
