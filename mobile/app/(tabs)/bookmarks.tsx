import React, { useContext } from "react"
import { FlatList, StyleSheet } from "react-native"
import { Post } from "../../components/Post"
import { ThemedView } from "../../components/Themed"
import { theme } from "../../theme"
import { BookmarksContext } from "./index"

export default function Bookmarks() {
	const context = useContext(BookmarksContext)
	if (!context) {
		return <ThemedView style={styles.container} />
	}
	const { bookmarks, toggleBookmark, posts } = context

	if (!Array.isArray(posts) || !Array.isArray(bookmarks)) {
		return <ThemedView style={styles.container} />
	}

	const bookmarkedPosts = posts.filter((post) => bookmarks.includes(post.id))

	return (
		<ThemedView
			style={styles.container}
			darkColor={theme.colorBlack}
			lightColor={theme.colorWhite}
		>
			<FlatList
				data={bookmarkedPosts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => {
					return (
						<Post
							imageSrc={item.imageSrc}
							aiDescription={item.aiDescription || ""}
							id={item.id}
							bookmarked={bookmarks.includes(item.id)}
							onBookmarkToggle={toggleBookmark}
						/>
					)
				}}
			/>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bookmarks: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: theme.space24,
	},
})
