import e, { type $infer } from "../../dbschema/edgeql-js"

// -- / (home)
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
		description: true,
		aiDescription: true,
		categories: true,
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

// -- /[username] (user profile)
export const profilePublic = e.params({ username: e.str }, ({ username }) => {
	return e.select(e.User, (u) => ({
		filter_single: e.op(u.name, "=", username),
		name: true,
		bio: true,
		place: true,
		profilePhotoUrl: true,
		createdPosts: {
			imageUrl: true,
			description: true,
			aiDescription: true,
			categories: true,
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
		return e.select(user, (u) => ({
			name: true,
			bio: true,
			place: true,
			displayName: true,
			profilePhotoUrl: true,
			createdPosts: e.select(u.createdPosts, (p) => ({
				offset: 0,
				limit: 6,
				order_by: {
					expression: p.created,
					direction: e.DESC,
				},
				imageUrl: true,
				imageWidth: true,
				imageHeight: true,
				imagePreviewBase64Hash: true,
				description: true,
				aiDescription: true,
				categories: true,
			})),
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

// -- /places/[place-name] (place profile)
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

// -- /chat (AI chat)
export const relevantPlacesQuery = e.params(
	{ location: e.str, category: e.str },
	({ location, category }) => {
		return e.select(e.Place, (place) => ({
			filter: e.op(
				e.op(place.category, "ilike", category),
				"and",
				e.op(place.location, "ilike", location),
			),
			name: true,
			displayName: true,
			location: true,
			profileImageUrl: true,
			bio: true,
			category: true,
			googleMapsUrl: true,
		}))
	},
)
export type relevantPlacesActionReturn = $infer<typeof relevantPlacesQuery>

// -- /settings
export const settingsAuth = e.params(
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
			displayName: true,
			profilePhotoUrl: true,
		}))
	},
)
export type settingsAuthReturn = $infer<typeof settingsAuth>

// -- /places/[place-name] (place profile)
export const placesPublic = e.params({ placeName: e.str }, ({ placeName }) => {
	return e.select(e.Place, (p) => ({
		filter_single: e.op(p.name, "=", placeName),
		name: true,
		displayName: true,
		location: true,
		profileImageUrl: true,
		bio: true,
		category: true,
		foodsAndDrinksServed: true,
		veganFriendly: true,
		quiet: true,
		googleMapsUrl: true,
	}))
})
export type placesPublicReturn = $infer<typeof placesPublic>
