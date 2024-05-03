"use client"
import { useState } from "react"
import Image from "next/image"

export default function Place(props: any) {
  const [following, SetFollowing] = useState<boolean>(false)
  const [postsState, setPostsState] = useState<{
    [key: number]: { liked: boolean; fillColor: string; likesCount: number }
  }>({})
  const [comments, setComments] = useState<
    Array<{ id: number; name: string; text: string }>
  >([
    { id: 1, name: "user1", text: "Pretty good" },
    { id: 2, name: "user2", text: "Good" },
    { id: 3, name: "user3", text: "Pretty good" },
    {
      id: 4,
      name: "user4",
      text: "text text text text text text text text text text text text text text text text text text text text ",
    },
    {
      id: 5,
      name: "user5",
      text: "text text text text text text text text text text text text text text text text text text text text ",
    },
    { id: 6, name: "user6", text: "Good" },
    { id: 7, name: "user7", text: "Pretty good" },
    {
      id: 8,
      name: "user8",
      text: "text text text text text text text text text text text text text text text text text text text text ",
    },
    { id: 9, name: "user9", text: "Pretty good" },
    {
      id: 10,
      name: "user10",
      text: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text ",
    },
    { id: 11, name: "user11", text: "Pretty good" },
    { id: 12, name: "user12", text: "Good" },
    { id: 13, name: "user13", text: "Pretty good" },
    { id: 14, name: "user14", text: "Good" },
    { id: 15, name: "user15", text: "Pretty good" },
    { id: 16, name: "user16", text: "Good" },
  ])
  const [newComment, setNewComment] = useState<string>("")
  const followPlace = () => {
    SetFollowing(!following)
  }

  const commentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }

  const postComment = () => {
    if (newComment.trim() !== "") {
      const nextId = comments.length + 1
      setComments([...comments, { id: nextId, name: "User", text: newComment }])
      setNewComment("")
    }
  }

  const likePost = (index: number) => {
    const newState = { ...postsState }
    if (newState[index]) {
      newState[index] = {
        liked: !newState[index].liked,
        fillColor: newState[index].liked ? "none" : "white",
        likesCount: newState[index].liked
          ? newState[index].likesCount - 1
          : newState[index].likesCount + 1,
      }
    } else {
      newState[index] = { liked: true, fillColor: "white", likesCount: 1 }
    }
    setPostsState(newState)
  }

  return (
    <div className="bg-white p-5 pb-0 grid grid-cols-7">
      <header className="sticky top-0 col-span-2 pl-5">
        <div className="flex items-start">
          <img
            src="exampleimage.jpg"
            alt="avatar"
            className="rounded-full w-46 h-46 mb-5"
          />
          <div className="flex flex-col ml-4 space-y-2">
            <h3 className="text-m">{props.params.name}</h3>
            <h3 className="text-neutral-600 text-sm">coffee shop</h3>
            <h3 className="text-sm">555 followers</h3>
          </div>
        </div>
        <button
          onClick={followPlace}
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 14.75V19.25"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 17L14.75 17"
              />
            </svg>
          )}
          <span style={{ color: following ? "#4F7942" : "black" }}>
            {following ? "following" : "follow"}
          </span>
        </button>
        <div className="mt-4">
          <h3 className="mb-3 text-base">
            {props.params.location || "City, country"}
          </h3>
          <h4 className="text-xs text-neutral-500 mb-1">
            liked by usernames+...
          </h4>
          <h4 className="text-xs text-neutral-500">total likes</h4>
          <h4 className="text-s text-neutral-800 mt-2">adress</h4>
          <h4 className="text-xs text-neutral-600 mt-1">~2.3 km from you</h4>
        </div>
        <div className="mt-4">
          <p
            className="text-gray-900 text-s font-light mt-2 pr-4"
            style={{ width: "22em" }}
          >
            text text text text text text text text text text text text text
            text text text text text text text text text text text
            {/* {props.params.description} */}
          </p>
          <div className="mt-4">
            <span className="text-gray-400 text-s font-light">
              you might like
            </span>
            <ul className="mt-2">
              {[
                {
                  name: "place",
                  category: "category",
                  link: "/places/place1",
                  img: "image1.jpg",
                },
                {
                  name: "place",
                  category: "category",
                  link: "/places/place2",
                  img: "image2.jpg",
                },
                {
                  name: "place",
                  category: "category",
                  link: "/places/place3",
                  img: "image3.jpg",
                },
              ].map((item) => (
                <li
                  key={item.name}
                  className="cursor-pointer flex items-center mb-3 font-light"
                >
                  <a href={item.link} className="flex items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="rounded-full w-6 h-6 mr-2"
                    />
                    <div>
                      <h3>{item.name}</h3>
                      <h4 className="text-gray-500 text-xs">{item.category}</h4>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <main className="col-span-3 flex justify-center">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="relative aspect-square group">
              <Image
                src={"/black.png"}
                alt={`Photo ${index + 1}`}
                width={300}
                height={400}
                className="w-full h-full object-cover hover:brightness-75"
              />
              <div className="hidden group-hover:flex group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute flex-col bottom-10 left-0 text-white p-1 w-full justify-center items-center">
                <h3 className="text-xs">by username</h3>
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
      </main>
      <div className="sticky top-0 col-span-2 flex flex-col h-[calc(100vh-10px)] overflow-auto ml-5 mb-2 flex-grow scrollbarHide">
        <h2 className="text-neutral-700 text-left ml-2 mb-4">255 comments</h2>
        <div className="flex flex-col flex-grow overflow-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 mb-2 flex items-start">
              <img
                src="/path/to/avatar.jpg"
                alt="Avatar"
                className="rounded-full w-8 h-8 mr-2"
              />
              <div>
                <p className="text-sm">{comment.name}</p>
                <p className="text-xs mt-2" style={{ whiteSpace: "pre-wrap" }}>
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 mb-2 relative w-full">
          <textarea
            className="w-full pl-3 pr-10 border-none resize-none overflow-hidden"
            style={{
              minHeight: "40px",
              borderTop: "1px solid #ccc",
              outline: "none",
            }}
            placeholder="comment..."
            value={newComment}
            onChange={(event) =>
              commentChange(
                event as unknown as React.ChangeEvent<HTMLInputElement>,
              )
            }
          />
          <button
            onClick={postComment}
            className="absolute text-black top-3 right-0 focus:outline-none"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 15.5V12.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
