import Icon from "~/components/Icon"
import { GoogleClient } from "~/lib/auth"

export default function Auth() {
  return (
    <>
      <style>
        {`
        #Auth:hover {
          transform: translateY(-4px);
          transition: all 0.3s linear;
        }
        #Auth {
          transition: all 0.3s linear
        }
        #text {
          opacity: 0.7;
          font-weight: bold;
        }
      `}
      </style>
      <div
        style={{
          "background-color": "#02050e",
        }}
      >
        <div
          style={{
            "background-image": "url('./blue-left.svg')",
            "background-size": "cover",
          }}
        >
          <div
            style={{
              "background-image": "url('./blue-right.svg')",
              "background-size": "cover",
            }}
            class="flex flex-col items-center h-screen justify-center text-white"
          >
            <div
              style={{
                border: "solid 1px rgba(13, 19, 39, 0.5)",
                "background-image": `linear-gradient(
                  34deg in oklab, 
                  rgb(1% 2% 5% / 86%) 0%, rgb(7, 12, 25) 50%, rgb(1% 2% 5% / 86%) 100%
                )`,
              }}
              class="flex flex-col items-center p-10 rounded-lg border-2 border-neutral-900"
            >
              <img
                style={{
                  "border-radius": "25px",
                  border: "2.5px solid black",
                  width: "90px",
                  height: "90px",
                }}
                src="./logo.jpg"
              />
              <div id="text" class="text-2xl mt-3 mb-2">
                Sign in/up with
              </div>
              <div class="flex gap-2 items-start">
                {/* <button
            class="flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5"
            style={{
              filter: "drop-shadow(1.5px 4.5px 3px #151515)",
            }}
            onClick={() => {
              // signIn("github")
              GithubClient.signinRedirect()
            }}
          >
            <Icon name="GitHub" />
          </button> */}
                <button
                  id="Auth"
                  class="flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5"
                  onClick={() => {
                    GoogleClient.signinRedirect()
                  }}
                >
                  <Icon name="Google" />
                </button>
              </div>
              {/* TODO: add email later (with magic link?) */}
              {/* <div
          style={{
            "margin-top": "35px",
            "border-top": "1px solid black",
            padding: "0 50px 0 50px",
          }}
        >
          <div
            style={{
              "margin-top": "-15px",
              padding: "0 10px 0 10px",
            }}
            class=" dark:bg-neutral-800 dark:text-gray-200 bg-white"
          >
            or countinue with
          </div>
        </div>
        <div class="flex flex-col items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="your@email.com"
            class="rounded border text-xs p-1 pl-2"
          />
          <button
            class="flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5 text-white"
            style={{
              filter: "drop-shadow(1.5px 4.5px 3px #151515)",
            }}
            onClick={() => {
              // TODO: Implement Google OAuth
            }}
          >
            <div>Continue</div>
          </button>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
