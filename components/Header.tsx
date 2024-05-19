"use client"
import { observer, useObservable } from "@legendapp/state/react"
import Link from "next/link"
import {
	GridIcon,
	NotificationIcon,
	PlusIcon,
	SearchIcon,
	UserIcon,
} from "../public/svg/search-icons"

export default observer(function Header() {
	const local = useObservable({
		activeLink: "",
		links: [
			{ href: "/places", label: "Places" },
			{ href: "/members", label: "Members" },
			{ href: "/foods", label: "Foods" },
		],
	})

	return (
		<>
			<div className="flex-between px-5 p-[20px] pb-[10px]">
				<div className="text-[22px] font-bold">
					<div className="flex flex-row gap-3">
						{...local.links.map((link) => {
							return (
								<Link key={link.href.get()} href={link.href.get()}>
									{link.label.get()}
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
})
