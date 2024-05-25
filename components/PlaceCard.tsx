import { useRouter } from "next/navigation"

interface Props {
	name: string
	displayName: string
	imageUrl: string
	category: string
}
export default function PlaceCard(props: Props) {
	const router = useRouter()
	return (
		<>
			<div
				className="px-5 max-w-sm rounded overflow-hidden shadow-lg text-white cursor-pointer"
				key={props.name}
				onClick={() => {
					router.push(`/places/${props.name}`)
				}}
			>
				<div
					className="bg-neutral-600 h-[400px] w-[400px] rounded-lg flex items-end p-4"
					style={{
						backgroundImage: `url(${props.imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="items-left bg-opacity-50 bg-black p-3 rounded">
						<div className="font-bold text-xl mb-2">{props.displayName}</div>
						<p className="text-gray-400 text-base">{props.category}</p>
					</div>
				</div>
			</div>
		</>
	)
}
