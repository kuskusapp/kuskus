import React, { useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
interface Props {
	open: boolean
	onClose: () => void
	postsState: any
}

const AddPostModal: React.FC<Props> = ({ open, onClose }) => {
	const [isOpen, setIsOpen] = useState(open)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState<File | null>(null)

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(event.target.files[0])
		}
	}

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	const handleCloseModal = () => {
		setIsOpen(false)
		onClose()
	}

	const handleSubmit = () => {
		console.log({ title, description, image })
		handleCloseModal()
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={() => {}}
			>
				<button
					className="fixed mt-10 mr-40 top-50 right-40 bg-neutral-200 hover:bg-neutral-400 px-4 py-2 rounded-full z-50"
					onClick={handleCloseModal}
				>
					x
				</button>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Panel className="fixed inset-0 bg-black opacity-50" />
					</Transition.Child>

					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
								className="flex gap-4"
							>
								<div className="flex-1">
									<div className="mt-4">
										<label
											htmlFor="image"
											className="block text-sm font-medium text-gray-700"
										>
											pick an image
										</label>
										<input
											type="file"
											id="image"
											onChange={handleImageChange}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
										/>
									</div>
								</div>
								<div className="flex-1">
									<div className="mt-4">
										<label
											htmlFor="title"
											className="block text-sm font-medium text-gray-700"
										>
											add title
										</label>
										<input
											type="text"
											id="title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm"
										/>
									</div>
									<div className="mt-4">
										<label
											htmlFor="description"
											className="block text-sm font-medium text-gray-700"
										>
											add description
										</label>
										<textarea
											id="description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
										/>
									</div>
									<div className="mt-4">
										<button
											type="submit"
											className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-blue-100 border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
										>
											create post
										</button>
									</div>
								</div>
							</form>
						</div>
					</Transition>
				</div>
			</Dialog>
		</Transition>
	)
}

export default AddPostModal
