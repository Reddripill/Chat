import React from 'react'

function OtherMessage({ message, name, currentDate }) {
	return (
		<div className="message other-message">
			<div className="message__body other-message__body">
				<div className="other-message__name">{name}</div>
				<div className="message__text other-message__text">{message}</div>
				<div className="message__time other-message__time">{currentDate}</div>
			</div>
		</div>
	)
}

export default OtherMessage;