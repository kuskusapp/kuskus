"use client"

import { profileAuthReturn } from "@/edgedb/crud/queries"
import { observer, useObservable } from "@legendapp/state/react"
import { useState } from "react"
import Image from "next/image"

interface Props {
  data: profileAuthReturn
}

export default observer(function ProfileAuth(props: Props) {
  const local$ = useObservable(props.data)

  // TODO: move this into local$ where it makes sense
  const [following, SetFollowing] = useState(false)
  const tabs = ["Photos", "Places", "Lists", "Following", "Followers"]
  const [selectedTab, setSelectedTab] = useState<string>("Photos")
  const [postsState, setPostsState] = useState<{
    [key: number]: { liked: boolean; fillColor: string; likesCount: number }
  }>({})

  const followUser = () => {
    // TODO: fix
    // SetFollowing(!following)
  }
  const likePost = (index: number) => {
    // const newState = { ...postsState }
    // if (newState[index]) {
    //   newState[index] = {
    //     liked: !newState[index].liked,
    //     fillColor: newState[index].liked ? "none" : "white",
    //     likesCount: newState[index].liked
    //       ? newState[index].likesCount - 1
    //       : newState[index].likesCount + 1,
    //   }
    // } else {
    //   newState[index] = { liked: true, fillColor: "white", likesCount: 1 }
    // }
    // setPostsState(newState)
  }

  return (
    <>
      <div className="bg-white grid grid-cols-3 p-7">
        <header className="col-span-1 pl-8">
          <div className="flex items-start">
            <img
              src="exampleimage.jpg"
              alt="avatar"
              className="rounded-full w-55 h-55 mb-5"
            />
            <div className="flex flex-col ml-4 space-y-2">
              <h3 className="text-base">{local$.displayName.get()}</h3>
              <h3 className="text-neutral-500 text-xs">@{local$.name.get()}</h3>
              <h3 className="text-s">{local$.place.get()}</h3>
            </div>
          </div>
          <button
            onClick={followUser}
            className="text-black flex flex-row items-center justify-center px-2 py-1 rounded-lg"
            style={{
              position: "absolute",
              top: "25px",
              left: "280px",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              border: "1px solid #ccc",
            }}
          >
            {following ? (
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: following ? "#4F7942" : "black" }}
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
                />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="8"
                  r="3.25"
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
                  d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17 14.75V19.25"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19.25 17L14.75 17"
                />
              </svg>
            )}
            <span style={{ color: following ? "#4F7942" : "black" }}>
              {following ? "following" : "follow"}
            </span>
          </button>
          <div style={{ width: "100%" }}>
            <ul className="flex flex-row mt-5 space-x-4">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer ${selectedTab === tab ? "font-normal" : "font-extralight"}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <p
              className="text-gray-900 text-s font-light mt-3 "
              style={{ width: "22em" }}
            >
              {local$.bio.get()}
            </p>
          </div>
        </header>
        <main className="col-span-2">
          {selectedTab === "Photos" && (
            <div className="grid grid-cols-4 gap-1">
              {local$.createdPosts.get()!.map((post, index) => (
                <div key={index} className="relative aspect-square group">
                  <Image
                    // src={"/black.png"}
                    src={post.photoUrl}
                    alt={`Photo ${index + 1}`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover hover:brightness-75"
                  />
                  <div className="hidden group-hover:flex group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute flex-col bottom-20 left-0 text-white p-1 w-full justify-center items-center">
                    <h3 className="text-base">place</h3>
                    <div
                      className="flex flex-row items-center"
                      onClick={() => likePost(index)}
                    >
                      <svg
                        width="24"
                        height="24"
                        fill={postsState[index]?.fillColor || "none"}
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3>{postsState[index]?.likesCount || 0}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === "Places" && (
            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <img
                  src="black"
                  alt="avatar"
                  className="rounded-full w-50 h-50 mr-5 mb-5 z-10"
                ></img>
                <h4>place</h4>
              </div>
            </div>
          )}
          {selectedTab === "Lists" && <div>Lists</div>}
          {selectedTab === "Following" && <div></div>}
          {selectedTab === "Followers" && <div></div>}
        </main>
      </div>
    </>
  )
})
