import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../features/users/usersSlice';

function Login() {
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	const changeHandler = event => {
		setUserName(event.target.value);
	}
	const submitHandler = event => {
		event.preventDefault();
		dispatch(login({ user: userName }))
		setUserName('')
	}
	return (
		<div className="chat-login">
			<form action="#" className="chat-login__form" onSubmit={submitHandler}>
				<div className="chat-login__title">Register</div>
				<div className="chat-login__text">
					Type your name to join of us chat, where we look forward to seeing you!
				</div>
				<div className="chat-login__input">
					<div className="chat-login__name">Your Name</div>
					<div className="chat-login__row">
						<img src="/img/user.svg" alt="user pic" className='chat-login__icon' />
						<input
							type="text"
							name='chat-login__field'
							className="chat-login__field"
							value={userName}
							onChange={changeHandler}
						/>
					</div>
					<label htmlFor="chat-login__field" className="chat-login__validate">
						Enter the name
					</label>
				</div>
				<input
					type='submit'
					className="chat-login__button"
					name='chat-login__button'
					value='Register'
				/>
			</form>
		</div>
	)
}

export default Login;