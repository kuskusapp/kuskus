import { Image } from "expo-image"
import { StyleSheet } from "react-native"

import { Button } from "./Button"
import { ThemedText, ThemedView, useThemeColor } from "./Themed"

import { useKuskusStore } from "@/store/kuskusStore"
import { theme } from "@/theme"

export function NotFound({ message }: { message: string }) {
	const refetch = useKuskusStore((state) => state.refreshData)
	const isRefetching = useKuskusStore((state) => state.isRefreshing)
	const iconColor = useThemeColor({
		light: theme.colorGrey,
		dark: theme.colorWhite,
	})
	return (
		<ThemedView
			style={styles.container}
			lightColor={theme.colorWhite}
			darkColor={theme.colorDarkBlue}
		>
			<ThemedText fontWeight="bold" fontSize={24} style={styles.heading}>
				{message}
			</ThemedText>
			<Image
				tintColor={iconColor}
				source={require("../assets/images/not-found.svg")}
				style={styles.image}
			/>

			<Button title="Refetch" onPress={refetch} isLoading={isRefetching} />
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: theme.space24,
	},
	image: {
		width: 100,
		height: 100,
		marginBottom: theme.space24 * 2,
	},
	heading: {
		marginBottom: theme.space24,
	},
})
