import React, { useRef } from "react"
import { auth } from "@/edgedb"
import Link from "next/link"
import { IoIosSearch } from "react-icons/io"
import { PiSignInThin } from "react-icons/pi"
// import NextSteps from "@/components/NextSteps"

export default async function Home() {
  const session = auth.getSession()

  return (
    <div>
      <header className="absolute inset-x-0 top-0 mb-10 z-50 bg-neutral-900">
        <nav
          className="flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-2">
            <>
              <Link
                href={auth.getBuiltinUIUrl()}
                className="text-sm font-semibold leading-6 text-gray-800"
              >
                <button className="bg-slate-600 px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light">
                  <PiSignInThin size={20} className="mr-1" />
                  Sign in
                </button>
              </Link>
              <Link
                href={auth.getBuiltinUISignUpUrl()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-black px-4 py-2 rounded-full text-white font-light flex flex-row border border-white border-opacity-20">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    width="1.5em"
                    height="1.5em"
                    data-icon="circle-arrow-up"
                    className="svg-inline--fa fa-circle-arrow-up text-headline mr-1"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 228.7l-96-96c-6.2-6.2-16.4-6.2-22.6 0l-96 96c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L240 182.6V368c0 8.8 7.2 16 16 16s16-7.2 16-16V182.6l68.7 68.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6z"
                    ></path>
                  </svg>
                  Sign up
                </button>
              </Link>
            </>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center mt-20 h-screen">
        <div
          className="justify-center flex flex-col mt-5 mb-10"
          style={{ maxWidth: "40em" }}
        >
          <h1 className="text-5xl font-bold text-white mb-5 text-center">
            KusKus
          </h1>
          <p className="text-xl font-light text-white text-opacity-45 mt-5 text-center">
            Enhance your dining experience with our user-friendly app that
            allows you to read and write reviews for dishes at local eateries,
            helping you make informed dining choices every time
          </p>
        </div>
        <div className="relative justify-center mt-8">
          <IoIosSearch
            className="absolute left-0 ml-3 text-zinc-500 justify-center"
            size={18}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="search"
            placeholder="Enter the name of the dish or restaurant..."
            className="p-2 rounded-full bg-neutral-900 text-zinc-500 w-300 placeholder-zinc-600 border-white border-opacity-20"
            style={{
              outline: "none",
              borderColor: "inherit",
              width: "40em",
              height: "3.5em",
              paddingLeft: "2em",
            }}
          />
        </div>
        <div className="flex flex-row mt-10">
          {[
            "sushi",
            "coffee",
            "pizza",
            "asian",
            "burger",
            "chinese",
            "italian",
            "mexican",
            "thai",
          ].map((item) => (
            <div
              key={item}
              className=" text-white bg-black font-light text-center border border-white border-opacity-20 p-4 mx-2 rounded-full"
            >
              {item.toUpperCase()}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
