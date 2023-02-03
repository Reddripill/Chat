import React, { useEffect, useRef, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FiImage } from 'react-icons/fi'
import { addMessage, allMessages } from '../features/messages/messagesSlice';
import { nanoid } from 'nanoid';
import { logout } from '../features/users/usersSlice';
import useTheme from '../hooks/useTheme';
import cn from 'classnames';
import AddImage from './AddImage';
import useGetFile from '../hooks/useGetFile';
import Message from './Message';
// import ContextMenu from './ContextMenu';


function dateFormatter() {
	const currentTime = new Date();
	let currentDate = [currentTime.getHours(), currentTime.getMinutes()].map(item => {
		if (item < 10) {
			item = '0' + item;
		}
		return item;
	})
	const [formattedCurrentHours, formattedCurrentMinutes] = currentDate;
	const time = `${formattedCurrentHours}:${formattedCurrentMinutes}`;
	return { time, fullDate: currentTime.getTime() };
}

function Chat() {
	const dispatch = useDispatch();
	const messages = useSelector(allMessages);
	const currentUser = useSelector(state => state.users.currentUser);
	const processedCurrentUser = currentUser.slice(0, 1).toUpperCase() + currentUser.slice(1);

	const { setFileHandler, preview, setPreview, setImage } = useGetFile();
	const { isDark } = useTheme();

	const formatter = dateFormatter();

	const [coords, setCoords] = useState({ top: 0, left: 0 })
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [text, setText] = useState('');
	const chatFieldRef = useRef(null);
	const textinput = useRef(null)
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
	useEffect(() => {
		const handleClick = () => setShowContextMenu(false);
		window.addEventListener('click', handleClick);
		return window.removeEventListener('click', handleClick);
	}, [])

	const changeHandler = event => {
		setText(event.target.value);
		event.target.style.height = `20px`;
		const scrollHeight = event.target.scrollHeight;
		event.target.style.height = `${scrollHeight}px`;
	}
	const submitHandler = event => {
		event.preventDefault();
		if (text !== '') {
			dispatch(addMessage({
				id: nanoid(),
				user: processedCurrentUser,
				data: {
					text,
				},
				currentDate: {
					time: formatter.time,
					fullDate: formatter.fullDate,
				}
			}));
			setText('');
			textinput.current.style.height = `20px`;
		}
	}
	const logoutHandler = event => {
		dispatch(logout());
	}
	const changeImageHandler = event => {
		setFileHandler(event);
	}

	let currentDate = new Date(0).toLocaleString('en', { month: 'long', day: 'numeric' });
	const chat = Object.values(messages).map((message, index, arr) => {
		const prevDate = currentDate;
		currentDate = new Date(message.currentDate.fullDate).toLocaleString('en', { month: 'long', day: 'numeric' });
		return (
			<li key={message.id}>
				{prevDate !== currentDate &&
					<div className='message__date'>{currentDate}</div>
				}
				<Message
					message={message}
					processedCurrentUser={processedCurrentUser}
					showingContextMenu={setShowContextMenu}
					setCoords={setCoords}
				/>
			</li>
		)
	})
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
					{/* {showContextMenu && <ContextMenu coords={coords} />} */}
				</ul>
				<div className={cn('chat-app__actions', "chat-actions", {
					dark: isDark
				})}>
					<form action="#" className="chat-actions__form" onSubmit={submitHandler}>
						<div className="chat-actions__emojis">
							<FiSmile />
						</div>
						<div className="chat-actions__textinput">
							<textarea
								type="text"
								placeholder='Reply ...'
								value={text}
								onChange={changeHandler}
								ref={textinput}
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
						currentUser={processedCurrentUser}
						formatter={formatter}
						setImage={setImage}
					/>
				}
			</div>
		</>
	)
}

export default Chat;