import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/users/usersSlice';
import useInput from '../hooks/useValidate';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';

function Login() {
	const dispatch = useDispatch();

	const { isDark } = useTheme();
	const name = useInput('', 'chat-login__field', { isEmpty: true, minLength: 3 });
	const allErrors = name.error;

	const submitHandler = event => {
		event.preventDefault();
		if (!allErrors) {
			dispatch(login({ user: name.value.toLowerCase() }))
		}
	}
	return (
		<div className={cn("chat-login", {
			dark: isDark
		})}>
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
							className={name.classname}
							value={name.value}
							onChange={name.changeHandler}
							onBlur={name.blurHandler}
							autoFocus
						/>
					</div>
					{name.isDirty && name.error &&
						<label htmlFor="chat-login__field" className="chat-login__validate">
							Enter the name
						</label>
					}
				</div>
				<input
					type='submit'
					className="chat-login__button"
					name='chat-login__button'
					value='Register'
					disabled={allErrors}
				/>
			</form>
		</div>
	)
}

export default Login;