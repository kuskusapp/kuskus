import { useState } from "react"
import { StyleSheet, View, Image } from "react-native"
import { ThemedText, ThemedView, useThemeColor } from "./Themed"
import { theme } from "../theme"
import AntDesign from "@expo/vector-icons/AntDesign"
import Ionicons from "@expo/vector-icons/Ionicons"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
	imageSrc: string
	aiDescription: string
	id: number
	onBookmarkToggle: (id: number) => void
	bookmarked: boolean
}

export function Post({
	imageSrc,
	aiDescription,
	id,
	onBookmarkToggle,
	bookmarked,
}: Props) {
	const shadow = useThemeColor({ light: theme.dropShadow, dark: undefined })
	const [activeLike, setActiveLike] = useState(false)
	const [likeCount, setLikeCount] = useState(0)

	const addLike = () => {
		setActiveLike(!activeLike)
		setLikeCount(activeLike ? likeCount - 1 : likeCount + 1)
	}

	const handleBookmark = () => {
		onBookmarkToggle(id)
	}

	return (
		<TouchableOpacity activeOpacity={0.8}>
			<ThemedView
				lightColor={theme.colorWhite}
				darkColor={theme.colorBlack}
				style={[styles.container, shadow]}
			>
				<ThemedView darkColor="rgba(155,223,177, 0.5)" style={styles.post}>
					<TouchableOpacity
						style={styles.bookmarkButton}
						onPress={handleBookmark}
					>
						<Ionicons
							name={bookmarked ? "bookmark" : "bookmark-outline"}
							size={20}
							color="black"
						/>
					</TouchableOpacity>
					<View style={styles.profile}>
						<Image
							source={{ uri: imageSrc }}
							style={{ width: 40, height: 40, borderRadius: 50 }}
						/>
						<View>
							<ThemedText fontSize={16} fontWeight="medium" marginBottom={5}>
								username
							</ThemedText>
							<ThemedText fontSize={16} marginBottom={10} fontWeight="medium">
								shared photo from [place]
							</ThemedText>
						</View>
					</View>
					<Image
						source={{ uri: imageSrc }}
						style={{ width: "100%", height: 300 }}
						resizeMode="contain"
					/>
					<TouchableOpacity style={styles.likes} onPress={addLike}>
						<AntDesign
							name={activeLike ? "heart" : "hearto"}
							size={18}
							color="black"
							style={{ marginRight: 5 }}
						/>
						<ThemedText fontSize={16} fontWeight="medium">
							{likeCount}
						</ThemedText>
					</TouchableOpacity>
				</ThemedView>
			</ThemedView>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: theme.space16,
		marginBottom: theme.space16,
		borderRadius: theme.borderRadius10,
	},
	post: {
		borderTopRightRadius: theme.borderRadius10,
		borderTopLeftRadius: theme.borderRadius10,
		paddingHorizontal: theme.space12,
		paddingTop: theme.space12,
		paddingBottom: theme.space12,
	},
	content: {
		paddingTop: theme.space12,
		paddingHorizontal: theme.space12,
		borderBottomRightRadius: theme.borderRadius10,
		borderBottomLeftRadius: theme.borderRadius10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	likes: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	bookmarkButton: {
		marginLeft: "auto",
	},
})
