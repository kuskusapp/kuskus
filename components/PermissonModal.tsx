import React from "react"
import ReactDOM from "react-dom"

interface ModalProps {
	children: React.ReactNode
	onClose: () => void
}

const PermissionModal: React.FC<ModalProps> = ({ children, onClose }) => {
	return ReactDOM.createPortal(
		<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center p-4">
			<div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-xl max-w-sm w-full">
				{children}
			</div>
		</div>,
		document.body,
	)
}

export default PermissionModal
