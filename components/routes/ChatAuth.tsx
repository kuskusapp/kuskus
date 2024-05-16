"use client"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {
	data: any
}

export default observer(function ChatAuth(props: Props) {
	const server = useObservable(props.data)
	const local = useObservable({})
	return <>chat here</>
})
