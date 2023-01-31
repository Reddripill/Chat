import React from 'react';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';

function OtherMessage({ message }) {
	const { isDark } = useTheme();

	const images = message.data.images?.map((image, index) => (
		<li key={message.id + index} className='message__image'>
			<img src={image} id={message.id + index} alt='Input pic' />
		</li>
	))
	return (
		<div className={cn("message", "other-message", {
			dark: isDark
		})}>
			<div className="message__body other-message__body">
				<div className="other-message__name">{message.user}</div>
				<div className="message__data other-message__data">
					{images &&
						<ul className="message__images other-message__images">
							{images}
						</ul>
					}
					{message.data.text &&
						<div className="message__text other-message__text">
							{message.data.text}
						</div>
					}
				</div>
				<div className="message__time other-message__time">{message.currentDate.time}</div>
			</div>
		</div>
	)
}

export default OtherMessage;