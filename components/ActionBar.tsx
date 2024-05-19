"use client"

import { observer, useObservable } from "@legendapp/state/react"

interface Props {}
export default observer(function ActionBar(props: Props) {
	const local = useObservable({
		activeTab: "" as "Home" | "Profile",
	})
	return <></>
})
