"use client"
import { observer } from "@legendapp/state/react"
import Link from "next/link"
import { PiSignInThin } from "react-icons/pi"
import Icons from "./Icons"

interface Props {
	authBuiltinUiUrl: string
	authBuiltinSignupUrl: string
}
export default observer(function SignInAndSignUp(props: Props) {
	return (
		<div className="justify-end flex flex-row mt-5 pr-3 gap-3">
			<Link
				href={props.authBuiltinUiUrl}
				className="text-sm font-semibold leading-6 text-gray-800"
			>
				<button className="before:ease relative overflow-hidden bg-white px-4 py-2 rounded-full text-black flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-gray-500 before:opacity-10 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-black">
					<PiSignInThin size={20} className="mr-1" />
					Sign in
				</button>
			</Link>
			<Link
				href={props.authBuiltinSignupUrl}
				className="text-sm font-semibold leading-6 text-gray-900"
			>
				<button className="before:ease relative overflow-hidden bg-black px-4 py-2 rounded-full text-white flex flex-row justify-center items-center font-light transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-20 before:duration-700 hover:shadow-gray-800 hover:before:-translate-x-40 border border-white border-opacity-20">
					<Icons name="SignUp" size={[20, 20]} />
					Sign up
				</button>
			</Link>
		</div>
	)
})
