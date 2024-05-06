import React, { useState } from "react"
import Image from "next/image"
import ReactModal from "react-modal"

interface ModalProps {
  selectedImage: string
  likesCount: number
  postsState: any
  closeModal: () => void
  // profileImage: string
  // profileName: string
}

const Modal: React.FC<ModalProps> = ({
  selectedImage,
  closeModal,
  // profileImage,
  // profileName,
  // postsState,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleCloseModal = () => {
    setIsOpen(false)
    closeModal()
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        },
        content: {
          display: "flex",
          width: "80vw",
          height: "80vh",
          margin: "auto",
          border: "none",
          backgroundColor: "transparent",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: "2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Image
            src={selectedImage}
            alt="Modal Image"
            width="700"
            height="800" // idk how to fix it. fixed params required
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-1 flex-col align-center bg-white space-y-5 py-10 px-10 bg-opacity-1">
          <div className="flex flex-row space-x-3">
            {/* <Image>profile pic</Image> */}
            <p className="text-lg font-medium">Profile Name</p>
          </div>
          <p className="text-base">(icon) Place</p>
          <p className="text-base">Likes: likesCount</p>
          <p className="text-base">Description</p>
          <p className="text-base pt-10">comments</p>
        </div>
      </div>
    </ReactModal>
  )
}

export default Modal
