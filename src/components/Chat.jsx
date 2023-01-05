import React, { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import OtherMessage from './OtherMessage';
import PersonalMessage from './PersonalMessage';
import { FiImage } from 'react-icons/fi'
import { addMessage, allMessages } from '../features/messages/messagesSlice';
import { nanoid } from 'nanoid';
import { logout } from '../features/users/usersSlice';

function Chat() {
	const dispatch = useDispatch();
	const messages = useSelector(allMessages);
	const currentUser = useSelector(state => state.users.currentUser);

	const [text, setText] = useState('');
	const chatFieldRef = useRef(null);
	useEffect(() => {
		const chatFieldElem = chatFieldRef.current;
		const coords = chatFieldElem.scrollHeight - chatFieldElem.clientHeight - chatFieldElem.scrollTop;
		const behavior = coords > 3000 ? 'auto' : 'smooth';
		chatFieldElem.scrollBy({
			top: coords,
			behavior: behavior
		})
	}, [messages])

	const changeHandler = event => {
		setText(event.target.value);
	}
	const submitHandler = event => {
		event.preventDefault();
		dispatch(addMessage({ id: nanoid(), user: currentUser, text }));
		setText('');
	}
	const logoutHandler = event => {
		dispatch(logout());
	}

	const chat = Object.values(messages).map(message => (
		<li key={message.id} className='chat-app__list'>
			{message.user === currentUser ?
				<PersonalMessage message={message.text} />
				:
				<OtherMessage message={message.text} name={message.user} />
			}
		</li>
	))
	return (
		<div className="chat-app">
			<div className="chat-app__top">
				<div className="chat-app__user">
					<div className='chat-app__icons'>
						<FaUserAlt />
					</div>
					<div className="chat-app__name">{currentUser}</div>
				</div>
				<div className="chat-app__logout" onClick={logoutHandler}>
					Leave the Chanel
				</div>
			</div>
			<ul className="chat-app__field" ref={chatFieldRef}>
				{chat}
			</ul>
			<div className="chat-app__actions chat-actions">
				<form action="#" className="chat-actions__form" onSubmit={submitHandler}>
					<div className="chat-actions__emojis">
						<img src="img/emojis.svg" alt="emojis" />
					</div>
					<div className="chat-actions__textinput">
						<input
							type="text"
							placeholder='Reply ...'
							value={text}
							onChange={changeHandler}
						/>
					</div>
					<div className="chat-actions__images">
						<FiImage />
					</div>
					<div className="chat-actions__submit">
						<div className="chat-actions__arrow">
							<img src="img/arrow.svg" alt="arrow" />
						</div>
						<input type='submit' value='' />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Chat;