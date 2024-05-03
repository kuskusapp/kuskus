"use client"
import react, { useState } from "react"
import { IoIosSearch } from "react-icons/io"

export default function Search() {
  const [inputFocused, setInputFocused] = useState(false)
  return (
    <div className="bg-white justify-center p-10">
      <div
        className="relative flex items-center justify-center h-10 m-auto"
        style={{ width: "70em" }}
      >
        <IoIosSearch
          className="absolute left-0 ml-3 text-black"
          size={inputFocused ? 24 : 18}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
        <input
          className="border border-neutral-500 rounded-full pl-10 pr-36 py-3"
          placeholder="Search for a place or a dish..."
          style={{ width: "100%" }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button
          className="absolute flex flex-row right-0 mr-1 px-4 py-2 rounded-full text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="7.25"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15.25 12C15.25 16.5 13.2426 19.25 12 19.25C10.7574 19.25 8.75 16.5 8.75 12C8.75 7.5 10.7574 4.75 12 4.75C13.2426 4.75 15.25 7.5 15.25 12Z"
            />
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M5 12H12H19"
            />
          </svg>
          or find places near you
        </button>
      </div>
      <div className="pt-10">
        <h2 className="text-xl font-normal">
          Places we recommend for you in{" "}
          <span className="">[City, Country]</span>
        </h2>
        <div></div>
      </div>
    </div>
  )
}
