import Features from "~/components/LandingPage/Features"

import FixedSidebar from "~/components/LandingPage/FixedSidebar"

export default function LandingPage() {
  return (
    <>
      <div class="flex justify-end">
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
