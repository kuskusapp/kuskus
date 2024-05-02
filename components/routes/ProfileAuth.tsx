"use client"

import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {
  data: profileAuthReturn
}

export default observer(function ProfileAuth(props: Props) {
  const local$ = useObservable(props.data)

  return (
    <>
      <div>Name: {local$.name.get()}</div>
    </>
  )
})
