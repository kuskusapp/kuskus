import { makeEventListener } from "@solid-primitives/event-listener"
import { register } from "@teamhanko/hanko-elements"
import { GraphQLClient } from "graphql-request"
import { onMount } from "solid-js"
import { useNavigate } from "solid-start"
import { UserCreateDocument, UserDocument } from "~/graphql/schema"
import { getHankoCookie } from "~/lib/auth"
import { logError } from "~/lib/tinybird"

export default function Auth() {
  const navigate = useNavigate()
  onMount(async () => {
    // TODO: check if there is a valid token, if token is valid go to /
    // TODO: can change to use https://github.com/teamhanko/hanko/tree/main/frontend/frontend-sdk
    // i.e. call https://github.com/teamhanko/hanko/tree/main/frontend/frontend-sdk#get-the-current-user--validate-the-jwt-against-the-hanko-api
    // TODO: make that hanko api url into VITE env!
    const res = await fetch(`${import.meta.env.VITE_HANKO_API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getHankoCookie()}`,
      },
    })

    if (res.status === 200) {
      navigate("/")
    }

    // register hanko component
    // https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register({ shadow: true, injectStyles: true }).catch(async (error) => {
      await logError({ error: "Hanko register error", metadata: error })
    })
  })

  makeEventListener(
    document,
    "hankoAuthSuccess",
    async (e) => {
      // const hankoEmailClient = new EmailClient(import.meta.env.HANKO_API_URL)
      // const signedInEmail = await hankoEmailClient.list()[0].address

      const hankoCookie = await getHankoCookie()
      const client = new GraphQLClient(import.meta.env.VITE_GRAFBASE_API_URL, {
        headers: {
          authorization: `Bearer ${hankoCookie}`,
        },
      })

      // TODO: should be improved ideally, ask grafbase devs how
      const user = await client.request(UserDocument)
      // TODO: why possibly undefined? fix.
      if (user.userCollection?.edges?.length > 0) {
        navigate("/")
        return
      }
      // crete empty user model if it does not exist
      await client.request(UserCreateDocument, {
        user: {},
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
              {/* TODO: should be fixed with new hanko-auth version */}
              {/* currently vite variables don't work.. */}
              {/* dev! */}
              {/* <hanko-auth
                api={"https://e879ccc9-285e-49d3-b37e-b569f0db4035.hanko.io"}
              /> */}
              {/* production! */}
              <hanko-auth
                api={"https://fae8e48b-e39d-4066-86a6-df7d5a449db9.hanko.io"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
