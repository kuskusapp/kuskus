import { createClient } from "edgedb"
import e from "@/dbschema/edgeql-js"

import Items from "@/components/Items"
import Link from "next/link"

export default async function Home() {
  const client = createClient()

  const itemsQuery = e.select(e.Item, (_item) => ({
    id: true,
    name: true,
    created: true,
    updated: true,
    created_by: {
      name: true,
      email: true,
    },
  }))

  const items = await itemsQuery.run(client)

  return (
    <>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Items
        </h1>
        <Link href="/dashboard/new">
          <button className="bg-primary text-white px-3 py-2 rounded-md text-xs font-semibold">
            + New Item
          </button>
        </Link>
      </header>
      <Items items={items} />
    </>
  )
}
