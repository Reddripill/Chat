import React from 'react';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';

function OtherMessage({ message, name, currentDate }) {
	const { isDark } = useTheme();
	return (
		<div className={cn("message", "other-message", {
			dark: isDark
		})}>
			<div className="message__body other-message__body">
				<div className="other-message__name">{name}</div>
				<div className="message__text other-message__text">{message}</div>
				<div className="message__time other-message__time">{currentDate}</div>
			</div>
		</div>
	)
}

export default OtherMessage;