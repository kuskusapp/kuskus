import e, { type $infer } from "../../dbschema/edgeql-js"

// -- home /
export const homePublic = e.select({
	popularDishes: e.assert_exists(
		e.assert_single(
			e.select(e.GlobalState, () => ({
				popularDishes: true,
				limit: 1,
			})),
		),
	),
	posts: e.select(e.Post, () => ({
		imageUrl: true,
		roninId: true,
		imageWidth: true,
		imageHeight: true,
		imagePreviewBase64Hash: true,
	})),
})
export type homePublicReturn = $infer<typeof homePublic>
export const homeAuth = e.params(
	{ userId: e.optional(e.uuid) },
	({ userId }) => {
		const user = e.op(
			e.cast(e.User, userId),
			"if",
			e.op("exists", userId),
			"else",
			e.global.current_user,
		)
		return e.select(user, () => ({
			name: true,
		}))
	},
)
export type homeAuthReturn = $infer<typeof homeAuth>

// -- profile /[username]
export const profilePublic = e.params({ username: e.str }, ({ username }) => {
	return e.select(e.User, (u) => ({
		filter: e.op(u.name, "=", username),
		name: true,
		bio: true,
		place: true,
		profilePhotoUrl: true,
		createdPosts: {
			imageUrl: true,
			description: true,
		},
	}))
})
export type profilePublicReturn = $infer<typeof profilePublic>

// context: https://discord.com/channels/841451783728529451/1235266238977150976 & https://discord.com/channels/841451783728529451/1235593775447937054 & https://discord.com/channels/841451783728529451/1238547782537580754
export const profileAuth = e.params(
	{ userId: e.optional(e.uuid) },
	({ userId }) => {
		const user = e.op(
			e.cast(e.User, userId),
			"if",
			e.op("exists", userId),
			"else",
			e.global.current_user,
		)
		return e.select(user, () => ({
			name: true,
			bio: true,
			place: true,
			displayName: true,
			profilePhotoUrl: true,
			createdPosts: {
				offset: 0,
				limit: 6,
				imageUrl: true,
				imageWidth: true,
				imageHeight: true,
				imagePreviewBase64Hash: true,
			},
		}))
	},
)
export type profileAuthReturn = $infer<typeof profileAuth>
export const profileLoadMorePosts = e.params(
	{ username: e.str, pageNumber: e.int64 },
	({ username, pageNumber }) => {
		const user = e.select(e.User, (u) => ({
			filter: e.op(u.name, "=", username),
		}))
		return e.select(user, () => ({
			createdPosts: {
				offset: e.op(pageNumber, "*", 6),
				limit: 6,
				imageUrl: true,
				imageWidth: true,
				imageHeight: true,
				imagePreviewBase64Hash: true,
			},
		}))
	},
)
export type profileAuthLoadMoreImages = $infer<typeof profileLoadMorePosts>

// -- places /places/[place-name]
export const placesAuth = e.params(
	{ placeName: e.str, userId: e.optional(e.uuid) },
	({ userId, placeName }) => {
		const user = e.op(
			e.cast(e.User, userId),
			"if",
			e.op("exists", userId),
			"else",
			e.global.current_user,
		)
		return e.select(e.Place, (place) => ({
			filter_single: e.op(place.name, "=", placeName),
			name: true,
			displayName: true,
			bio: true,
			category: true,
			profilePhoto: true,
		}))
	},
)
export type placesAuthReturn = $infer<typeof placesAuth>
