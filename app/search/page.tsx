"use client"
import { useState } from "react"
import Image from "next/image"
import { IoIosSearch } from "react-icons/io"
import {
  GridIcon,
  SearchIcon,
  UserIcon,
  NotificationIcon,
  PlusIcon,
} from "../../public/svg/search-icons"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const recommendedPlaces = [
  {
    id: "place1",
    name: "Place 1",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
  {
    id: "place2",
    name: "Place 2",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
  {
    id: "place3",
    name: "Place 3",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
  {
    id: "place4",
    name: "Place 4",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
  {
    id: "place5",
    name: "Place 5",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
  {
    id: "place6",
    name: "Place 6",
    category: "coffeeshop",
    imageUrl: "/https://a.jpg",
  },
]

export default function Search() {
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          width: "100%",
          zIndex: 100,
        }}
        className="flex flex-row space-x-2 justify-center"
      >
        <div
          className="mb-5 flex justify-center items-center space-x-3 rounded-full py-2"
          style={{
            width: "13%",
            marginLeft: "auto",
            marginRight: "10px",
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
            width: "40px",
            height: "40px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
          }}
          className="rounded-full items-center justify-center flex text-white focus:outline-none focus:ring"
        >
          <PlusIcon className="text-white w-7 h-7" />
        </button>
      </div>
      <div className="bg-white justify-center px-5 pt-5 mt-20">
        <div
          className="relative flex items-center justify-center h-10 m-auto"
          style={{ width: "100%" }}
        >
          <IoIosSearch
            className="absolute left-0 ml-3 text-black"
            size={inputFocused ? 24 : 18}
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            className="border border-neutral-500 rounded-full pl-10 pr-36 py-3"
            placeholder="Lets find something tasty! Type place or dish"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15.25 12C15.25 16.5 13.2426 19.25 12 19.25C10.7574 19.25 8.75 16.5 8.75 12C8.75 7.5 10.7574 4.75 12 4.75C13.2426 4.75 15.25 7.5 15.25 12Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 12H12H19"
              />
            </svg>
            or discover nearby dining
          </button>
        </div>
        <div className="pb-20 space-y-20">
          <div className="pt-10">
            <h2 className="text-2xl font-normal">
              Places we recommend for you in{" "}
              <span className="">[City, Country]</span>
            </h2>
            <Swiper
              className="mt-10"
              spaceBetween={20}
              slidesPerView={4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {recommendedPlaces.map((place) => (
                <SwiperSlide key={place.id}>
                  <div className="w-80 h-40 relative">
                    <Image
                      className="rounded-lg"
                      src={place.imageUrl}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col text-left pt-2 pl-2 space-y-1">
                    <p className="text-base">{place.name}</p>
                    <p className="text-xs">{place.category}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h2 className="text-2xl font-normal">Just Opened! Check it Out</h2>
            <Swiper
              className="mt-10"
              spaceBetween={20}
              slidesPerView={4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {recommendedPlaces.map((place) => (
                <SwiperSlide key={place.id}>
                  <div className="w-80 h-40 relative">
                    <Image
                      className="rounded-lg"
                      src={place.imageUrl}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col text-left pt-2 pl-2 space-y-1">
                    <p className="text-base">{place.name}</p>
                    <p className="text-xs">{place.category}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h2 className="text-2xl font-normal">Text</h2>
            <Swiper
              className="mt-10"
              spaceBetween={20}
              slidesPerView={4}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {recommendedPlaces.map((place) => (
                <SwiperSlide key={place.id}>
                  <div className="w-80 h-40 relative">
                    <Image
                      className="rounded-lg"
                      src={place.imageUrl}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col text-left pt-2 pl-2 space-y-1">
                    <p className="text-base">{place.name}</p>
                    <p className="text-xs">{place.category}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}
