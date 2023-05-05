import { useNavigate } from "solid-start"
import Icon from "../Icon"

export default function FixedSidebar() {
  const navigate = useNavigate()
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
          width: "47vw",
        }}
        class="h-screen"
      >
        <div class="lg:top-0 lg:left-0 lg:fixed flex justify-center items-center h-screen w-screen lg:w-1/2">
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
              <button
                class="text-white flex w-full justify-center p-3 bg-black mb-2 rounded-md active:translate-y-0.5 hover:bg-green-600 hover:border-green-600 hover:-translate-y-1 transition-all"
                onClick={() => {}}
                style={{ opacity: "0.8" }}
              >
                Download
                {/* <Icon name="" /> */}
              </button>
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
