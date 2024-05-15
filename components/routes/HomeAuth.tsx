"use client"
import { observer } from "@legendapp/state/react"

interface Props {
	data: any
}

export default observer(function HomeAuth(props: Props) {
	return <>authorised</>
})
