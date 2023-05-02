import Features from "~/components/LandingPage/Features"

import FixedSidebar from "~/components/LandingPage/FixedSidebar"

export default function LandingPage() {
  return (
    <>
      <div class="flex justify-end bg-white dark:bg-gray-950">
        <FixedSidebar />
        <div class="relative flex-auto">
          <main>
            <Features />
          </main>
        </div>
      </div>
    </>
  )
}
