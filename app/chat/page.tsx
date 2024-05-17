import ChatAuth from "@/components/routes/ChatAuth"
import { auth } from "@/edgedb-next-client"
import type { PageProps } from "./$types"

// const openai = new OpenAI()

// const sendMessage = (prompt: string) => generateText({
//   model: 'gpt-4o'
//   system: "you are a friendly weather assistant!",
//   prompt,
//   tools: {
//     getWeather: {
//       description: 'Get the weather in a location',
//       parameters: z.object({
//         location: z.string().describe('The location to get the weather for')
//       }),
//       execute: async ({ location }: { location: string }) => ({
//         location,
//         temperature: 72 + Math.floor(Math.random() * 21) - 10
//       })
//     },
//   }
// })
// i.e. places nearby me that serve sushi
// async function submitMessageForRelatedPlaces(userInput) {
// 	"use server"
// 	return render({
// 		provider: openai,
// 		model: "gpt-4-0125-preview",
// 		messages: [
// 			{ role: "system", content: "You are a helpful assistant" },
// 			{ role: "user", content: userInput },
// 		],
// 		text: ({ content }) => <p>{content}</p>,
// 		tools: {
// 			get_places_that_serve_user_query: {
// 				description: "Get places for served foods and drinks",
// 				parameters: z
// 					.object({
// 						category: z.string(),
// 						foodsAndDrinksServed: z.array(z.string()),
// 						veganFriendly: z.boolean(),
// 						quiet: z.boolean(),
// 					})
// 					.required(),
// 				render: async function* ({
// 					category,
// 					foodsAndDrinksServed,
// 					veganFriendly,
// 					quiet,
// 				}) {
// 					return (
// 						<div>
// 							{JSON.stringify({
// 								category,
// 								foodsAndDrinksServed,
// 								veganFriendly,
// 								quiet,
// 							})}
// 						</div>
// 					)
// 				},
// 			},
// 		},
// 	})
// }

interface PlaceCardProps {
	name: string
	imageUrl: string
}
const PlaceCard: React.FC<PlaceCardProps> = ({ name, imageUrl }) => {
	return (
		<div className=" shadow-md rounded-lg overflow-hidden">
			<img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
			<div className="p-4">
				<h3 className="text-lg font-bold">{name}</h3>
				<div className="flex items-center mt-2">
					<svg
						className="w-4 h-4 fill-current text-yellow-500 ml-1"
						viewBox="0 0 20 20"
					>
						<path d="M10 15l-5.5 3 1-5.5L0 7h6L10 2l4 5h6l-5.5 5.5 1 5.5z" />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default async function Chat({ params }: PageProps) {
	const session = auth.getSession()
	const client = session.client
	const authenticated = await session.isSignedIn()

	// return (
	// 	<PlaceCard
	// 		name="Bułka z Masłem Włodkowica"
	// 		imageUrl="https://lh5.googleusercontent.com/p/AF1QipNc_A88yvJ1uJGvtC8X7MEczd32xFjeVIkWfB3R=w408-h408-k-no"
	// 	/>
	// )

	return <ChatAuth data={""} />
}
