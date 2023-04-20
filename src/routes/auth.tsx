import Icon from "~/components/Icon"
import { GoogleClient } from "~/lib/auth"

export default function Auth() {
  return (
    <>
      <div class="flex flex-col items-center h-screen justify-center">
        <img
          style={{
            "border-radius": "50%",
            border: "2.5px solid black",
            width: "90px",
            height: "90px",
            transform: "rotate(27deg)",
          }}
          src="./nearly-black-logo.jpg"
        />
        <div class="text-2xl mt-3 mb-2">Sign in/up with</div>
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
            class="flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5"
            style={{
              filter: "drop-shadow(1.5px 4.5px 3px #151515)",
            }}
            onClick={() => {
              console.log(import.meta.env, "env")
              // GoogleClient.signinRedirect()
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
    </>
  )
}
