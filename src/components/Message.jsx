import React from 'react'
import OtherMessage from './OtherMessage';
import PersonalMessage from './PersonalMessage';

function Message({ message, processedCurrentUser, showingContextMenu, setCoords }) {
	const contextMenuHandler = event => {
		event.preventDefault();
		setCoords({ top: event.pageY, left: event.pageX })
		showingContextMenu(true);
	}
	return (
		<div className='chat-app__list' onContextMenu={contextMenuHandler}>
			{message.user === processedCurrentUser ?
				<PersonalMessage message={message} />
				:
				<OtherMessage message={message} />
			}
		</div>
	)
}

export default Message;