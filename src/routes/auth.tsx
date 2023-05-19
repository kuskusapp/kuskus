import { createEventListener } from "@solid-primitives/event-listener"
import { register } from "@teamhanko/hanko-elements"
import { createEffect, createSignal, onMount } from "solid-js"
import { makeEventListener } from "@solid-primitives/event-listener"

export default function Auth() {
  onMount(() => {
    // setHankoApi(import.meta.env.VITE_HANKO_API)
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true, injectStyles: true }).catch((error) => {
      // handle error
    })
  })
  makeEventListener(
    document,
    "hankoAuthSuccess",
    (e) => {
      console.log("success!")
    },
    { passive: true }
  )

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

        hanko-auth::part(secondary-button) {
          opacity: 0.8;
          border-color: white;
          color: white;
        }

      hanko-auth, hanko-profile {
        /* Color Scheme */
        --color: #171717;
        --color-shade-1: #8f9095;
        --color-shade-2: #e5e6ef;

        --brand-color: #506cf0;
        --brand-color-shade-1: #6b84fb;
        --brand-contrast-color: white;

        --background-color: transparent;
        --error-color: #e82020;
        --link-color: #506cf0;

        /* Font Styles */;
        --font-weight: 400;
        --font-size: 14px;
        --font-family: sans-serif;

        /* Border Styles */;
        --border-radius: 4px;
        --border-style: solid;
        --border-width: 1px;

        /* Item Styles */;
        --item-height: 34px;
        --item-margin: .5rem 0;

        /* Container Styles */;
        --container-padding: 0;
        --container-max-width: 600px;

        /* Headline Styles */;
        --headline1-font-size: 0px;
        --headline1-font-weight: 600;
        --headline1-margin: 0 0 .5rem;

        --headline2-font-size: 14px;
        --headline2-font-weight: 600;
        --headline2-margin: 1rem 0 .25rem;

        /* Divider Styles */;
        --divider-padding: 0 42px;
        --divider-visibility: visible;

        /* Link Styles */;
        --link-text-decoration: none;
        --link-text-decoration-hover: underline;

        /* Input Styles */;
        --input-min-width: 12em;

        /* Button Styles */;
        --button-min-width: max-content;
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
              {/* @ts-ignore */}
              {/* <hanko-auth api={import.meta.env.HANKO_API} /> */}
              {/* @ts-ignore */}
              <hanko-auth api={""} />
              {/* @ts-ignore */}
              {/* <hanko-auth api={hankoApi()} /> */}
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
