import clsx from "clsx"
import { A } from "solid-start"

export default function Nav() {
  return (
    <div>
      <nav
        style={{ "border-bottom": "1px solid rgba(255, 255, 255, .5)" }}
        class={clsx(
          "flex justify-between ml-48 mr-48 items-center border-b-2 p-4"
        )}
      >
        <div class="flex items-center gap-2">
          <img
            style={{
              "border-radius": "50%",
              border: "1px solid black",
              opacity: "60%",
              width: "35px",
              height: "35px",
            }}
            src="./logo.jpg"
          />
          <div>KUSKUS</div>
        </div>
        <A href="/auth">Sign In</A>
      </nav>
    </div>
  )
}
