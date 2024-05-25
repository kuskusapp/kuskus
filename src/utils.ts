import toast from "react-hot-toast"

export function classNames(...classes: (string | boolean | undefined)[]) {
	return classes.filter(Boolean).join(" ")
}

export function fileToBase64(file: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			resolve(reader.result as string)
		}
		reader.onerror = (error) => {
			reject(error)
		}
		reader.readAsDataURL(file)
	})
}
export const errorToast = (msg: string) => toast(`⚠️ ${msg}`)
