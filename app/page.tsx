import { auth } from "@/edgedb"
import Link from "next/link"
import NextSteps from "@/components/NextSteps"

export default async function Home() {
  const session = auth.getSession()

  const signedIn = await session.isSignedIn()

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-1 justify-end space-x-2">
            {!signedIn ? (
              <>
                <Link
                  href={auth.getBuiltinUIUrl()}
                  className="text-sm font-semibold leading-6 text-gray-800"
                >
                  <button className="ring-2 ring-inset ring-primary bg-primarylight px-4 py-2 rounded-md">
                    Sign in
                  </button>
                </Link>
                <Link
                  href={auth.getBuiltinUISignUpUrl()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  <button className="bg-primary px-4 py-2 rounded-md text-white">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <Link
                href="dashboard"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <button className="bg-primary px-4 py-2 rounded-md text-white">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-24 lg:pt-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              EdgeDB Next.js Starter
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Welcome to the EdgeDB Next.js Starter. This starter is designed to
              help you get up and running with EdgeDB and Next.js quickly. It
              includes a basic setup for authentication, EdgeDB schema, and a UI
              to get you started. Below are some next steps to help you get up
              to speed.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-2xl pt-4 sm:pt-8 lg:pt-12">
          <NextSteps />
        </div>
      </div>
    </div>
  )
}
