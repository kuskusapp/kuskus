"use client"

interface Props {
  name: string
  size?: [number, number]
}
export default function Icons(props: Props) {
  const height = props.size && props.size[1] ? `${props.size[1]}px` : "24px"
  const width = props.size && props.size[0] ? `${props.size[0]}px` : "24px"

  switch (props.name) {
    case "SignUp":
      return (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          width={width}
          height={height}
          data-icon="circle-arrow-up"
          className="group svg-inline--fa fa-circle-arrow-up text-headline mr-1"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className=""
            fill="currentColor"
            d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 228.7l-96-96c-6.2-6.2-16.4-6.2-22.6 0l-96 96c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L240 182.6V368c0 8.8 7.2 16 16 16s16-7.2 16-16V182.6l68.7 68.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6z"
          ></path>
        </svg>
      )
      break
    case "World":
      return (
        <svg width={width} height={height} fill="none" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="7.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15.25 12C15.25 16.5 13.2426 19.25 12 19.25C10.7574 19.25 8.75 16.5 8.75 12C8.75 7.5 10.7574 4.75 12 4.75C13.2426 4.75 15.25 7.5 15.25 12Z"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 12H12H19"
          />
        </svg>
      )
  }
}
