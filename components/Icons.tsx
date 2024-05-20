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
					className="svg-inline--fa fa-circle-arrow-up text-headline mr-1"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="currentColor"
						d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 228.7l-96-96c-6.2-6.2-16.4-6.2-22.6 0l-96 96c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L240 182.6V368c0 8.8 7.2 16 16 16s16-7.2 16-16V182.6l68.7 68.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6z"
					></path>
				</svg>
			)

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

		case "Checkmark":
			return (
				<svg width={width} height={height} fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
					/>
				</svg>
			)

		case "Plus":
			return (
				<svg width={width} height={height} fill="none" viewBox="0 0 24 24">
					<circle
						cx="12"
						cy="8"
						r="3.25"
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
						d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
					/>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M17 14.75V19.25"
					/>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M19.25 17L14.75 17"
					/>
				</svg>
			)
		case "Tag":
			return (
				<svg width={width} height={height} fill="none" viewBox="0 0 24 24">
					<circle cx="15" cy="9" r="1" fill="currentColor"></circle>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M12 4.75H19.25V12L12.5535 18.6708C11.7544 19.4668 10.4556 19.445 9.68369 18.6226L5.28993 13.941C4.54041 13.1424 4.57265 11.8895 5.36226 11.1305L12 4.75Z"
					></path>
				</svg>
			)
		case "Camera":
			return (
				<svg width={width} height={height} fill="none" viewBox="0 0 24 24">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="1.5"
						d="M19.25 17.25V9.75C19.25 8.64543 18.3546 7.75 17.25 7.75H16.9167C16.513 7.75 16.1489 7.50726 15.9936 7.13462L15.2564 5.36538C15.1011 4.99274 14.737 4.75 14.3333 4.75H9.66667C9.26297 4.75 8.89886 4.99274 8.74359 5.36538L8.00641 7.13462C7.85114 7.50726 7.48703 7.75 7.08333 7.75H6.75C5.64543 7.75 4.75 8.64543 4.75 9.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25Z"
					></path>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="1.5"
						d="M15.25 13C15.25 14.7949 13.7949 16.25 12 16.25C10.2051 16.25 8.75 14.7949 8.75 13C8.75 11.2051 10.2051 9.75 12 9.75C13.7949 9.75 15.25 11.2051 15.25 13Z"
					></path>
				</svg>
			)
	}
}
