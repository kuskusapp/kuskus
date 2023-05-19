import { onMount } from "solid-js"
import Icon from "~/components/Icon"
import { GoogleClient } from "~/lib/auth"
import { register } from "@teamhanko/hanko-elements"

export default function Auth() {
  onMount(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true }).catch((error) => {
      // handle error
    })
  })
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
              <hanko-auth api={hankoApi} />
              {/* <div class="flex gap-2 items-start">
                <button
                  id="Auth"
                  class="flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5"
                  onClick={() => {
                    GoogleClient.signinRedirect()
                  }}
                >
                  <Icon name="Google" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
