import Features from "~/components/LandingPage/Features"

import FixedSidebar from "~/components/LandingPage/FixedSidebar"

export default function LandingPage() {
  return (
    <>
      <div class="bg-white dark:bg-gray-950">
        <div
          class="flex justify-end"
          style={{
            "background-image": `      radial-gradient(
              farthest-corner circle at 120% 50% in oklab, 
              hsl(220 75% 10%) 0%, oklch(90% 0.50 200 / 0%) 100%
            )`,
          }}
        >
          <div
            class="absolute top-10 left-10"
            style={{
              "background-image": ` radial-gradient(
                farthest-corner circle at 0% 1% in oklab, 
                hsl(220 75% 10%) 0%, oklch(90% 0.50 200 / 0%) 100%
              )`,
            }}
          ></div>
          <FixedSidebar />
          <div class="relative flex-auto">
            <main>
              <Features />
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
