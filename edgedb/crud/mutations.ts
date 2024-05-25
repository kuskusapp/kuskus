import e from "../../dbschema/edgeql-js"

export const createPost = e.params(
	{
		imageUrl: e.str,
		roninId: e.str,
		imageWidth: e.optional(e.int16),
		imageHeight: e.optional(e.int16),
		imagePreviewBase64Hash: e.optional(e.str),
		aiDescription: e.optional(e.str),
		imageFileNameFromImport: e.optional(e.str),
		userId: e.optional(e.uuid),
	},
	({
		imageUrl,
		roninId,
		imageWidth,
		imageHeight,
		imagePreviewBase64Hash,
		aiDescription,
		imageFileNameFromImport,
		userId,
	}) => {
		const user = e.op(
			e.cast(e.User, userId),
			"if",
			e.op("exists", userId),
			"else",
			e.global.current_user,
		)
		return e.insert(e.Post, {
			imageUrl,
			roninId,
			imageWidth,
			imageHeight,
			imagePreviewBase64Hash,
			aiDescription,
			imageFileNameFromImport,
			created_by: user,
		})
	},
)

export const createPlace = e.params(
	{
		name: e.str,
		displayName: e.str,
		location: e.str,
		profileImageUrl: e.optional(e.str),
		profileImageRoninId: e.optional(e.str),
		bio: e.optional(e.str),
		category: e.optional(e.str),
		foodsAndDrinksServed: e.optional(e.array(e.str)),
		veganFriendly: e.optional(e.bool),
		quiet: e.optional(e.bool),
		googlePlaceId: e.optional(e.str),
		googleMapsUrl: e.optional(e.str),
		userId: e.optional(e.uuid),
	},
	({
		name,
		displayName,
		location,
		profileImageUrl,
		profileImageRoninId,
		bio,
		category,
		foodsAndDrinksServed,
		veganFriendly,
		quiet,
		googlePlaceId,
		googleMapsUrl,
	}) => {
		return e.insert(e.Place, {
			name,
			displayName,
			location,
			profileImageUrl,
			profileImageRoninId,
			bio,
			category,
			foodsAndDrinksServed: e.array_unpack(foodsAndDrinksServed),
			veganFriendly,
			quiet,
			googlePlaceId,
			googleMapsUrl,
		})
	},
)

export const createGlobalState = e.params(
	{
		popularDishes: e.optional(e.array(e.str)),
	},
	({ popularDishes }) => {
		return e.insert(e.GlobalState, {
			popularDishes: e.array_unpack(
				e.op(popularDishes, "??", e.cast(e.array(e.str), e.set())),
			),
		})
	},
)

export const updateUser = e.params(
	{
		userId: e.optional(e.uuid),
		username: e.optional(e.str),
		bio: e.optional(e.str),
		place: e.optional(e.str),
		displayName: e.optional(e.str),
		githubAvatarUrl: e.optional(e.str),
	},
	({ userId, bio, place, displayName, githubAvatarUrl, username }) => {
		const user = e.op(
			e.cast(e.User, userId),
			"if",
			e.op("exists", userId),
			"else",
			e.global.current_user,
		)
		return e.update(user, (u) => ({
			set: {
				bio: e.op(bio, "??", u.bio),
				username: e.op(username, "??", u.name),
				place: e.op(place, "??", u.place),
				displayName: e.op(displayName, "??", u.displayName),
				githubAvatarUrl: e.op(githubAvatarUrl, "??", u.githubAvatarUrl),
			},
		}))
	},
)

export const updateGlobalState = e.params(
	{
		popularDishes: e.optional(e.array(e.str)),
	},
	({ popularDishes }) => {
		const globalState = e.assert_exists(e.assert_single(e.GlobalState))

		return e.update(globalState, (global) => ({
			set: {
				popularDishes: e.array_unpack(
					e.op(popularDishes, "??", e.cast(e.array(e.str), e.set())),
				),
			},
		}))
	},
)

// TODO: delete by edgedb uuid
export const deletePost = e.params(
	{
		imageUrl: e.str,
	},
	({ imageUrl }) => {
		return e.delete(e.Post, (post) => ({
			filter: e.op(post.imageUrl, "=", imageUrl),
		}))
	},
)
