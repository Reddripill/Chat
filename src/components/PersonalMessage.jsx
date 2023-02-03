import React from 'react';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';
import { Link } from 'react-router-dom';

function PersonalMessage({ message }) {
	const { isDark } = useTheme();

	const images = message.data.images?.map((image, index) => (
		<li key={message.id + index} className='message__image'>
			<Link to={`/image/${message.id + index}`}>
				<img src={image} id={message.id + index} alt='Input pic' />
			</Link>
		</li>
	))
	return (
		<div className={cn("message", "personal-message", {
			dark: isDark
		})}>
			<div className="message__body personal-message__body">
				<div className="message__data personal-message__data">
					{images &&
						<ul className="message__images personal-message__images">
							{images}
						</ul>
					}
					{message.data.text &&
						<div className="message__text personal-message__text">
							{message.data.text}
						</div>
					}
				</div>
				<div className="message__time personal-message__time">{message.currentDate.time}</div>
			</div>
		</div>
	)
}

export default PersonalMessage;