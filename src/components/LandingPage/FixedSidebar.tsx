import { useNavigate } from "solid-start"
import Icon from "../Icon"
import { Show, createSignal } from "solid-js"
import { Motion } from "@motionone/solid"

export default function FixedSidebar() {
  const navigate = useNavigate()
  const [showDownload, setShowDownload] = createSignal(false)
  return (
    <>
      <style>
        {`
        #Discord {
          transition: all 0.3s ease-in-out 0s
        }
          #Discord:hover {
            transform: rotate(360deg);
            transition: all 0.3s ease-in-out 0s;
          }
          #Twitter {
            transition: all 0.3s ease-in-out 0s
          }
            #Twitter:hover {
              transform: rotate(360deg);
              transition: all 0.3s ease-in-out 0s;
            }
            #Github {
              transition: all 0.3s ease-in-out 0s
            }
              #Github:hover {
                transform: rotate(360deg);
                transition: all 0.3s ease-in-out 0s;
              }
              #AnimationTop {
                animation: 1s linear 0s 1 slideInFromTop;
              }
              @keyframes slideInFromTop {
                0% {
                    transform: translateY(20px);
                    opacity: 0;
                }
                70% {
                  transform: translateY(0);
                }
                100% {
                    opacity: 1;
                }
            }
        `}
      </style>
      <div
        style={{
          width: "50vw",
        }}
        class="h-screen"
      >
        <div
          class="lg:top-0 lg:left-0 lg:fixed flex justify-center items-start h-screen w-screen lg:w-1/2"
          style={{ "padding-top": "30vh" }}
        >
          <div class="flex flex-col justify-center items-center">
            <div class="flex items-center gap-3">
              {/* TODO: not sure why it wants fetchpriority.. */}
              {/* @ts-ignore */}
              <img
                style={{
                  "border-radius": "17px",
                  width: "60px",
                  height: "60px",
                }}
                src="./logo.jpg"
              />
              <div
                class="text-white text-4xl font-bold"
                style={{ opacity: "0.9" }}
              >
                KusKus
              </div>
            </div>
            <h1 class="mt-14 font-display text-4xl/tight font-light dark:text-white text-white select-none ">
              Fast todo app with{" "}
              <span class="text-sky-300 hover:font-semibold transition-all">
                AI
              </span>
            </h1>
            <p
              class="mt-4 text-sm/6 w-96 text-center text-neutral-200"
              style={{ opacity: "0.5" }}
            >
              KusKus is a todo app that uses AI to help you get things done.
              It's very keyboard driven.
            </p>
            <div class="flex flex-col items-center mt-5">
              <div class="w-full flex flex-col gap-2 mb-2">
                <button
                  class="text-white flex w-full justify-center p-3 bg-black rounded-md active:translate-y-0.5 hover:bg-green-600 hover:border-green-600 hover:-translate-y-1 transition-all"
                  onClick={() => {
                    setShowDownload(!showDownload())
                  }}
                  style={{ opacity: "0.8" }}
                >
                  Download
                  {/* <Icon name="" /> */}
                </button>
                <Show when={showDownload()}>
                  <Motion.div class="flex flex-col w-full gap-2 justify-between items-center">
                    <Motion.div
                      initial={{ transform: "translateY(-20px)" }}
                      animate={{ transform: "translateY(0px)" }}
                      transition={{ duration: 0.2 }}
                      class="p-3 flex w-full items-center justify-center rounded bg-blue-500 opacity-80"
                    >
                      {/* TODO: have links not be hard coded, take latest release? */}
                      <a
                        href="https://github.com/kuskusapp/kuskus/releases/download/app-v0.0.1/KusKus_0.0.1_universal.dmg"
                        class="cursor-pointer"
                      >
                        macOS
                      </a>
                    </Motion.div>
                    <Motion.div
                      initial={{ transform: "translateY(-20px)" }}
                      animate={{ transform: "translateY(0px)" }}
                      transition={{ duration: 0.2 }}
                      class="p-3 flex w-full items-center justify-center rounded bg-blue-500 opacity-80"
                    >
                      <a
                        href="https://github.com/kuskusapp/kuskus/releases/download/app-v0.0.1/KusKus_0.0.1_x64_en-US.msi"
                        class="cursor-pointer"
                      >
                        Windows
                      </a>
                    </Motion.div>
                    <Motion.div
                      initial={{ transform: "translateY(-20px)" }}
                      animate={{ transform: "translateY(0px)" }}
                      transition={{ duration: 0.2 }}
                      class="p-3 flex w-full items-center justify-center rounded bg-blue-500 opacity-80"
                    >
                      <a
                        href="https://github.com/kuskusapp/kuskus/releases/download/app-v0.0.1/kus-kus_0.0.1_amd64.AppImage"
                        class="cursor-pointer"
                      >
                        Linux
                      </a>
                    </Motion.div>
                  </Motion.div>
                </Show>
              </div>
              <div class="flex gap-3 relative">
                <button
                  class="text-white flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5 hover:bg-white hover:text-black hover:-translate-y-1 transition-all"
                  onClick={() => {
                    navigate("/auth")
                  }}
                  style={{
                    opacity: "0.8",
                  }}
                >
                  Log In
                  {/* <Icon name="" /> */}
                </button>
                <button
                  class="text-white flex justify-center p-3 bg-black w-32 rounded-md active:translate-y-0.5 hover:bg-white hover:text-black hover:-translate-y-1 transition-all"
                  onClick={() => {
                    navigate("/auth")
                  }}
                  style={{
                    opacity: "0.8",
                  }}
                >
                  Sign Up
                  {/* <Icon name="" /> */}
                </button>
              </div>
              <div
                id="AnimationTop"
                class=" absolute bottom-3 right-50 flex gap-3"
              >
                <a
                  id="Discord"
                  class="w-5 mt-4"
                  href="https://discord.gg/f8YHjyrX3h"
                >
                  <Icon name="Discord" />
                </a>
                <a
                  id="Twitter"
                  class="w-5 mt-4"
                  href="https://twitter.com/kuskusapp"
                >
                  <Icon name="Twitter" />
                </a>{" "}
                <a
                  id="Github"
                  class="w-5 mt-4"
                  href="https://github.com/kuskusapp/kuskus"
                >
                  <Icon name="Github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
