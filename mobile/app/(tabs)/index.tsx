import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { ThemedView } from "../../components/Themed"
import { Post } from "../../components/Post"

export default function Schedule() {
	const [posts, setPosts] = React.useState([
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

	return (
		<ThemedView style={styles.container}>
			<ScrollView>
				{posts.map((post) => {
					return (
						<Post
							imageSrc={post.imageSrc}
							aiDescription={post.aiDescription}
							id={post.id}
						/>
					)
				})}
			</ScrollView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 100,
	},
})
