import Features from "~/components/LandingPage/Features"

import FixedSidebar from "~/components/LandingPage/FixedSidebar"

export default function LandingPage() {
  return (
    <>
      <div class="bg-gray-950">
        <div
          class="lg:flex lg:justify-end"
          style={{
            "background-image": `radial-gradient(
              farthest-corner circle at 120% 50% in oklab,
              hsl(220 75% 10%) 0%, oklch(90% 0.50 200 / 0%) 100%
            )`,
          }}
        >
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
