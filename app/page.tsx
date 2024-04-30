"use client"
import React, { useRef, useEffect, useState } from "react"
// import { auth } from "@/edgedb"
import Link from "next/link"
import { IoIosSearch, IoIosArrowForward, IoIosArrowDown } from "react-icons/io"
import { PiSignInThin } from "react-icons/pi"

export default function Home() {
  // const session = auth.getSession()
  const [inputFocused, setInputFocused] = useState(false)
  const [hoveredDish, setHoveredDish] = useState<number | null>(null)

  const dishes = [
    "Coffee",
    "Smoothie",
    "Pasta",
    "Ramen",
    "Tacos",
    "Steak",
    "Curry",
    "Pizza",
    "Sushi",
    "Burger",
    "Salad",
  ]

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
          <p className="text-xl font-light text-black text-opacity-50 mt-5 text-center">
            KusKus is community for food lovers,
            <span className="display: block">
              who love to see new places and share them
            </span>
          </p>
        </div>
        <div className="relative flex items-center justify-center h-10">
          <IoIosSearch
            className="absolute left-0 ml-3 text-black"
            size={inputFocused ? 22 : 18}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className="border border-neutral-500 rounded-full pl-10 pr-36 py-3"
            placeholder=" "
            style={{ width: "50em" }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <button
            className="absolute right-0 mr-1 px-4 py-2 rounded-full text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            or find places near you
          </button>
        </div>
        <div className="flex flex-row mt-10">
          {dishes.map((dish, index) => (
            <button
              key={index}
              className="bg-transparent border border-black rounded-full px-4 py-2 m-1 hover:bg-lime-200 hover:-rotate-3 transition-transform duration-600 ease-in-out relative overflow-hidden flex items-center"
              onMouseEnter={() => setHoveredDish(index)}
              onMouseLeave={() => setHoveredDish(null)}
            >
              {dish}
              <span
                className={`absolute mr-1 right-0 transition-opacity duration-700 ease-in-out hover:rotate-180 ${hoveredDish === index ? "opacity-100" : "opacity-0"}`}
              >
                ?
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
