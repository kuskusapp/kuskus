// @refresh reload
import { Suspense } from "solid-js"
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start"
import "./root.css"
// import { GlobalProvider } from "./GlobalContext/global"

export default function Root() {
  const location = useLocation()
  // TODO: not used?
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600"

  return (
    <Html lang="en">
      <Head>
        <Title>KusKus - Fast todo app</Title>{" "}
        <meta
          name="description"
          content="KusKus is a fast and smart todo app"
        />
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            {/* <GlobalProvider> */}
            <Routes>
              <FileRoutes />
            </Routes>
            {/* </GlobalProvider> */}
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
