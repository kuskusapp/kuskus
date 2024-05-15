"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export default function DeleteItem({
	item,
	handleDelete,
}: {
	item: { id: string }
	handleDelete: (id: string) => Promise<string | null>
}) {
	const router = useRouter()
	return (
		<button
			type="button"
			className="text-sm font-semibold text-red-600 mt-2"
			onClick={async () => {
				const error = await handleDelete(item.id)
				if (error) {
					alert(error)
					return
				}

				router.refresh()
			}}
		>
			<TrashIcon className="w-4 h-4" />
			<span className="sr-only">Delete</span>
		</button>
	)
}
