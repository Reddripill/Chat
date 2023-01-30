import React from 'react';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';

function PersonalMessage({ message, currentDate }) {
	const { isDark } = useTheme();
	return (
		<div className={cn("message", "personal-message", {
			dark: isDark
		})}>
			<div className="message__body personal-message__body">
				<div className="message__text personal-message__text">{message}</div>
				<div className="message__time personal-message__time">{currentDate.time}</div>
			</div>
		</div>
	)
}

export default PersonalMessage;