import React from "react"

function PhotoModal({ photo, description, likes, comments }) {
	return (
		<div className="photo-modal">
			<div className="photo-section">
				<img src={photo} alt="Modal Photo" />
			</div>
			<div className="info-section">
				<div className="description">{description}</div>
				<div className="likes">
					<span>{likes} likes</span>
					<button>Like</button>
				</div>
				<div className="comments">
					{comments.map((comment, index) => (
						<div key={index} className="comment">
							<span className="username">{comment.username}</span>
							<span className="comment-text">{comment.commentText}</span>
							<div className="comment-likes">
								<span>{comment.commentLikes} likes</span>
								<button>Like</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PhotoModal
