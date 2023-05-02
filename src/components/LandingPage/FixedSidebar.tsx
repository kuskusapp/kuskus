import { useNavigate } from "solid-start"

export default function FixedSidebar() {
  const navigate = useNavigate()
  return (
    <div
      style={{
        width: "47vw",
        "background-image": "url('./red-gradient-background.svg')",
      }}
      class="h-screen"
    >
      <div
        style={{
          width: "47vw",
        }}
        class="top-0 left-0 fixed flex justify-center items-center h-screen "
      >
        <div class="flex flex-col justify-center items-center">
          <div class="flex items-center gap-3">
            <img
              style={{
                "border-radius": "25px",
                width: "90px",
                height: "90px",
              }}
              src="./logo.jpg"
              // src="./wat.svg"
            />
            <div class="text-white text-4xl">KusKus</div>
          </div>
          <h1 class="mt-14 font-display text-4xl/tight font-light dark:text-white text-white">
            Fast todo app with <span class="text-sky-300">AI</span>
          </h1>
          <p class="mt-4 text-sm/6 text-gray-300 w-96 text-center">
            KusKus is a todo app that uses AI to help you get things done. It's
            very keyboard driven.
          </p>
          <div class="flex flex-col items-center mt-5">
            <button
              class="text-white flex w-full justify-center p-3 bg-black mb-2 rounded-md active:translate-y-0.5 hover:bg-green-600 hover:border-green-600"
              style={{
                filter: "drop-shadow(1.5px 4.5px 3px #151515)",
              }}
              onClick={() => {}}
            >
              Download
              {/* <Icon name="" /> */}
            </button>
            <div class="flex gap-3">
              <button
                class="text-white flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5 hover:bg-white hover:text-black"
                style={{
                  filter: "drop-shadow(1.5px 4.5px 3px #151515)",
                }}
                onClick={() => {
                  navigate("/auth")
                }}
              >
                Log In
                {/* <Icon name="" /> */}
              </button>
              <button
                class="text-white flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5 hover:bg-white hover:text-black"
                style={{
                  filter: "drop-shadow(1.5px 4.5px 3px #151515)",
                }}
                onClick={() => {
                  navigate("/auth")
                }}
              >
                Sign Up
                {/* <Icon name="" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
