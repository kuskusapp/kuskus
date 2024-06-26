import { AIcon } from "@/public/svg/modal-icons"

export default function AiThinking() {
	return (
		<div className="p-2 flex flex-row">
			<AIcon className="spin text-purple-600 h-4 w-4" />
			<p className="font-thin text-right text-xs text-white">AI is thinking</p>
		</div>
	)
}
