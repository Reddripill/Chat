import React from 'react'

function PersonalMessage({ message, currentDate }) {
	return (
		<div className="message personal-message">
			<div className="message__body personal-message__body">
				<div className="message__text personal-message__text">{message}</div>
				<div className="message__time personal-message__time">{currentDate}</div>
			</div>
		</div>
	)
}

export default PersonalMessage;