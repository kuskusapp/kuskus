"use client"
import React, { useRef, useEffect, useState } from "react"
// import { auth } from "@/edgedb"
import Link from "next/link"
import { IoIosSearch, IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { PiSignInThin } from "react-icons/pi"

export default function Home() {
  // const session = auth.getSession()
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50 mx-10 py-5">
        <nav
          className="flex items-center justify-betwween p-2 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-2">
            <>
              <div className="absolute left-10 flex flex-row space-x-7">
                {" "}
                <h3>KusKus</h3>
                <h3>Explore</h3>
                <h3>About</h3>
              </div>
              <Link
                // href={auth.getBuiltinUIUrl()}
                href=".."
                className="text-sm font-semibold leading-6 text-gray-800"
              >
                <button className="before:ease relative overflow-hidden bg-neutral-700 px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40">
                  <PiSignInThin size={20} className="mr-1" />
                  Sign in
                </button>
              </Link>
              {/* ) : ( */}
              <Link
                // href={auth.getBuiltinUISignUpUrl()}
                href=".."
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="before:ease relative overflow-hidden bg-black px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-white border-opacity-20">
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
              {/* )} */}
            </>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center mt-20 h-screen">
        <div
          className="justify-center flex flex-col mt-5 mb-10"
          style={{ maxWidth: "40em" }}
        >
          <h1 className="text-6xl font-m text-black mb-3 text-center">
            Share and rate food
          </h1>
          <p className="text-xl font-light text-black text-opacity-45 mt-5 text-center">
            KusKus is community for food lovers,
            <span className="text-black display: block">
              who love to see new places and share them
            </span>
          </p>
        </div>
        <div className="relative h-10">
          <IoIosSearch
            className="absolute right-0 mr-3 text-black justify-center"
            size={inputFocused ? 21 : 18}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className="peer w-full h-full justify-center bg-transparent text-black font-sans font-normal outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-black placeholder-shown:border-t-white border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-black focus:border-black"
            placeholder=" "
            style={{ width: "65em", padding: "1.5rem 2rem" }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <label className="text-black flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-black leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-black transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-black peer-focus:text-black before:border-black peer-focus:before:!border-black after:border-black peer-focus:after:!border-black">
            Enter name of dish or restaurant
          </label>
        </div>
      </main>
    </div>
  )
}
