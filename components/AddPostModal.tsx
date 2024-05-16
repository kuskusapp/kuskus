import React, { useState, useEffect, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { PhotoIcon } from "../public/svg/modal-icons"
import { observer, useObservable } from "@legendapp/state/react"

interface Props {
	open: boolean
	onClose: () => void
	postsState: any
}

export default observer(function AddPostModal(props: Props) {
	const local = useObservable({
		isOpen: props.open,
		title: "",
		description: "",
		image: null as File | null,
	})

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			// @ts-ignore
			local.image.set(event.target.files[0])
		}
	}

	useEffect(() => {
		local.isOpen.set(props.open)
	}, [props.open])

	const handleCloseModal = () => {
		local.isOpen.set(false)
		props.onClose()
	}

	const handleSubmit = () => {
		handleCloseModal()
	}

	return (
		<Transition appear show={local.isOpen.get()} as={Fragment}>
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
						<Dialog.Panel className="fixed inset-0 bg-black opacity-70" />
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
						<div className="inline-block w-full max-w-4xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<form
								onSubmit={(e) => {
									e.preventDefault()
									handleSubmit()
								}}
								className="flex gap-5"
								style={{ minHeight: "500px" }}
							>
								<div
									className="w-2/3 flex justify-center items-center m-auto"
									style={{ borderRight: "1px solid #c5c5c5", height: "500px" }}
								>
									<button
										className="mt-1 w-full h-full flex justify-center items-center bg-white focus:outline-none"
										// onClick={() => document.getElementById("image").click()}
									>
										<PhotoIcon className="h-6 w-6 text-gray-700" />
										<input
											type="file"
											id="image"
											onChange={handleImageChange}
											className="hidden"
										/>
									</button>
								</div>
								<div className="flex-1 flex flex-col">
									<div className="flex-1">
										<div className="mt-4">
											<label
												htmlFor="title"
												className="block text-sm font-thin text-gray-700"
											>
												Title
											</label>
											<input
												type="text"
												id="title"
												value={local.title.get()}
												onChange={(e) => {
													local.title.set(e.target.value)
												}}
												className="mt-1 block w-full px-3 py-2 rounded-md border-none shadow-sm focus:outline-none sm:text-sm"
											/>
										</div>
										<div className="mt-4">
											<label
												htmlFor="description"
												className="block text-sm font-thin text-gray-700"
											>
												Description
											</label>
											<input
												id="description"
												value={local.description.get()}
												onChange={(e) => {
													// setDescription(e.target.value)
												}}
												className="mt-1 block w-full px-3 py-2 bg-white border-none rounded-md shadow-sm focus:outline-none sm:text-sm"
											/>
										</div>
									</div>
								</div>
							</form>
						</div>
					</Transition>
				</div>
			</Dialog>
		</Transition>
	)
})
