import { makeEventListener } from "@solid-primitives/event-listener"
import { register } from "@teamhanko/hanko-elements"
import { GraphQLClient } from "graphql-request"
import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import {
  UserDetailsCreateDocument,
  UserDetailsDocument,
} from "~/graphql/schema"
import { getHankoCookie } from "~/lib/auth"

export default function Auth() {
  const navigate = useNavigate()
  onMount(() => {
    // TODO: check if there is a valid token, if token is valid go to /
    // if (token.valid) {
    //   navigate("/")
    // }

    // register hank component
    // https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true, injectStyles: true }).catch((error) => {
      // TODO: handle error
    })
  })

  makeEventListener(
    document,
    "hankoAuthSuccess",
    async (e) => {
      const hankoCookie = await getHankoCookie()
      const client = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
        headers: {
          authorization: `Bearer ${hankoCookie}`,
        },
      })

      // TODO: does not look good but is needed for stripe to work
      // we need to have userDetails to 100% be present in resolver
      // the id from userDetails is our way to identify the user
      const userDetails = await client.request(UserDetailsDocument)
      // TODO: why possibly undefined? fix.
      if (userDetails.userDetailsCollection?.edges?.length > 0) {
        navigate("/")
        return
      }
      // crete empty userDetails if it does not exist
      await client.request(UserDetailsCreateDocument, {
        userDetails: {},
      })
      navigate("/")
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
          padding-top: 10px;
          opacity: 0.7;
          font-weight: bold;
        }


        hanko-auth, hanko-profile {
          --color: #fff;
          --color-shade-1: #989BA1;
          --color-shade-2: #43464E;
          --brand-color: #AEDFFF;
          --brand-color-shade-1: #A1C9E7;
          --brand-contrast-color: #0B0D0E;
          --background-color: transparent;
          --error-color: #FF2E4C;
          --link-color: #AEDFFF;
          --font-family: "IBM Plex Sans";
          --font-size: 1rem;
          --font-weight: 400;
          --headline1-font-size: 0px;
          --headline1-font-weight: 600;
          --headline2-font-size: 1rem;
          --headline2-font-weight: 600;
          --border-radius: 8px;
          --item-height: 40px;
          --item-margin: 18px 0px;
          --container-padding: 20px 50px 50px 50px;
          --container-max-width: 800px;
          --headline1-margin: 0 0 1rem;
          --headline2-margin: 1rem 0 .5rem;
        }


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
              {/* TODO: for some reason can't use import.meta.env.VITE_HANKO_API. fix it. */}
              {/* @ts-ignore */}
              {/* <hanko-auth api={import.meta.env.VITE_HANKO_API} /> */}
              {/* @ts-ignore */}
              <hanko-auth
                api={"https://e879ccc9-285e-49d3-b37e-b569f0db4035.hanko.io"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
