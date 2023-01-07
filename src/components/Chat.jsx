import React, { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import OtherMessage from './OtherMessage';
import PersonalMessage from './PersonalMessage';
import { FiImage } from 'react-icons/fi'
import { addMessage, allMessages } from '../features/messages/messagesSlice';
import { nanoid } from 'nanoid';
import { logout } from '../features/users/usersSlice';
import useTheme from '../hooks/useTheme';
import cn from 'classnames';


function dateFormatter() {
	const currentTime = new Date();
	let currentDate = [currentTime.getHours(), currentTime.getMinutes()].map(item => {
		if (item < 10) {
			item = '0' + item;
		}
		return item;
	})
	const [formattedCurrentHours, formattedCurrentMinutes] = currentDate;
	const formattedCurrentTime = `${formattedCurrentHours}:${formattedCurrentMinutes}`;
	return formattedCurrentTime;
}

function Chat() {
	const dispatch = useDispatch();
	const messages = useSelector(allMessages);
	const currentUser = useSelector(state => state.users.currentUser);

	const { isDark } = useTheme();

	const [text, setText] = useState('');
	const chatFieldRef = useRef(null);
	useEffect(() => {
		const chatFieldElem = chatFieldRef.current;
		const coords = chatFieldElem.scrollHeight - chatFieldElem.clientHeight - chatFieldElem.scrollTop;
		chatFieldElem.scrollBy({
			top: coords,
			behavior: 'auto'
		})
	}, [])
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
		if (text !== '') {
			dispatch(addMessage({ id: nanoid(), user: currentUser, text, currentDate: dateFormatter() }));
			setText('');
		}
	}
	const logoutHandler = event => {
		dispatch(logout());
	}

	const chat = Object.values(messages).map(message => (
		<li key={message.id} className='chat-app__list'>
			{message.user === currentUser ?
				<PersonalMessage message={message.text} currentDate={message.currentDate} />
				:
				<OtherMessage message={message.text} name={message.user} currentDate={message.currentDate} />
			}
		</li>
	))
	return (
		<div className={cn('chat-app', {
			dark: isDark
		})}>
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
			<div className={cn('chat-app__actions', "chat-actions", {
				dark: isDark
			})}>
				<form action="#" className="chat-actions__form" onSubmit={submitHandler}>
					<div className="chat-actions__emojis">
						<FiSmile />
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