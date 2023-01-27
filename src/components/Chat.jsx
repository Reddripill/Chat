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
import AddImage from './AddImage';
import useGetFile from '../hooks/useGetFile';


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
	const processedCurrentUser = currentUser.slice(0, 1).toUpperCase() + currentUser.slice(1);

	const { setFileHandler, preview, setPreview } = useGetFile();
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
			dispatch(addMessage({ id: nanoid(), user: processedCurrentUser, text, currentDate: dateFormatter() }));
			setText('');
		}
	}
	const logoutHandler = event => {
		dispatch(logout());
	}
	const changeImageHandler = event => {
		setFileHandler(event);
	}

	const chat = Object.values(messages).map(message => (
		<li key={message.id} className='chat-app__list'>
			{message.user === processedCurrentUser ?
				<PersonalMessage message={message.text} currentDate={message.currentDate} />
				:
				<OtherMessage message={message.text} name={message.user} currentDate={message.currentDate} />
			}
		</li>
	))
	return (
		<>
			<div className={cn('chat-app', {
				dark: isDark
			})}>
				<div className="chat-app__top">
					<div className="chat-app__user">
						<div className='chat-app__icons'>
							<FaUserAlt />
						</div>
						<div className="chat-app__name">{processedCurrentUser}</div>
					</div>
					<button className="chat-app__logout" onClick={logoutHandler} tabIndex='0'>
						Leave the Chanel
					</button>
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
								tabIndex='1'
								autoFocus
							/>
						</div>
						<div className="chat-actions__images">
							<input
								type="file"
								className="chat-actions__file"
								onChange={changeImageHandler}
								onClick={(event) => event.target.value = ''}
								multiple
							/>
							<FiImage />
						</div>
						<div className="chat-actions__submit">
							<div className="chat-actions__arrow">
								<img src="img/arrow.svg" alt="arrow" />
							</div>
							<input type='submit' value='' tabIndex='2' />
						</div>
					</form>
				</div>
				{preview.length !== 0 &&
					<AddImage
						preview={preview}
						setFileHandler={setFileHandler}
						setPreview={setPreview}
					/>
				}
			</div>
		</>
	)
}

export default Chat;