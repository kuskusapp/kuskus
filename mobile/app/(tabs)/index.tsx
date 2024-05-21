import { useState, useContext, createContext } from "react"
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { ThemedView } from "../../components/Themed"
import { Post } from "../../components/Post"
import Feather from "@expo/vector-icons/Feather"
import Bookmarks from "./bookmarks"

type PostType = {
	id: number
	imageSrc: string
	aiDescription?: string
}

type BookmarksContextType = {
	bookmarks: number[]
	toggleBookmark: (id: number) => void
	posts: PostType[]
}

export const BookmarksContext = createContext<BookmarksContextType | null>(null)

export default function Schedule() {
	const [posts, setPosts] = useState<PostType[]>([
		{
			id: 1,
			imageSrc:
				"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
			aiDescription: "Food photo",
		},
		{
			id: 2,
			imageSrc:
				"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
			aiDescription: "Food photo",
		},
		{
			id: 3,
			imageSrc:
				"https://storage.ronin.co/spa_m8okrzy9ivjnlsr8/dc57049b-41f6-47ce-8254-436a971291e7",
			aiDescription: "Food photo",
		},
	])

	const [bookmarks, setBookmarks] = useState<number[]>([])

	const toggleBookmark = (id: number) => {
		setBookmarks((prevBookmarks) =>
			prevBookmarks.includes(id)
				? prevBookmarks.filter((bookmarkId) => bookmarkId !== id)
				: [...prevBookmarks, id],
		)
	}

	return (
		<BookmarksContext.Provider value={{ bookmarks, toggleBookmark, posts }}>
			<ThemedView style={styles.container}>
				<TouchableOpacity style={styles.addPostButton}>
					<Feather name="camera" size={24} color="black" />
				</TouchableOpacity>
				<ScrollView>
					{posts.map((post) => (
						<Post
							key={post.id}
							imageSrc={post.imageSrc}
							aiDescription={post.aiDescription || ""}
							id={post.id}
							isBookmarked={bookmarks.includes(post.id)}
							onBookmarkToggle={toggleBookmark}
						/>
					))}
				</ScrollView>
				<Bookmarks />
			</ThemedView>
		</BookmarksContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 90,
	},
	addPostButton: {
		position: "absolute",
		zIndex: 1,
		top: 40,
		right: 20,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
})
