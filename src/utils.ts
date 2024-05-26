import toast from "react-hot-toast"

export function classNames(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ")
}

export const errorToast = (msg: string) => toast(`⚠️ ${msg}`)
