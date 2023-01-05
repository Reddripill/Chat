import React from 'react'

function PersonalMessage({ message }) {
	return (
		<div className="message personal-message">
			<div className="message__body personal-message__body">
				<div className="message__text personal-message__text">{message}</div>
				<div className="message__time personal-message__time">08:15 AM</div>
			</div>
		</div>
	)
}

export default PersonalMessage;