"use client"
import Link from "next/link"
import {
  GridIcon,
  SearchIcon,
  UserIcon,
  NotificationIcon,
  PlusIcon,
} from "../public/svg/search-icons"
import { useObservable } from "@legendapp/state/react"

export default function Header() {
  const local$ = useObservable({
    activeLink: "",
    links: [
      { href: "/places", label: "Places" },
      { href: "/members", label: "Members" },
      { href: "/foods", label: "Foods" },
    ],
  })

  return (
    <>
      <div className="flex flex-row items-center justify-between space-x-15 pt-[20px] px-4">
        <div className="text-[34px] font-bold">
          <div className="flex flex-row gap-3">
            {...local$.links.map((link) => {
              return (
                <Link key={link.href.get()} href={link.href.get()}>
                  {link.label.get()}
                </Link>
              )
            })}
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            width: "fit-content",
            zIndex: 100,
          }}
          className="flex flex-row gap-5 justify-center"
        >
          <div
            className=" h-[50px] flex justify-center items-center space-x-3 rounded-full py-2 px-3"
            style={{
              // width: "13%",
              marginLeft: "auto",

              justifyContent: "center",
              backgroundColor: "rgb(47 47 48)",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <GridIcon className="text-white w-7 h-7" />
            <SearchIcon className="text-white w-7 h-7" />
            <UserIcon className="text-white w-7 h-7" />
            <NotificationIcon className="text-white w-7 h-7" />
          </div>
          <button
            style={{
              backgroundColor: "rgb(47 47 48)",
              width: "50px",
              height: "50px",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
            className="rounded-full items-center justify-center flex text-white focus:outline-none focus:ring"
          >
            <PlusIcon className="text-white w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  )
}
