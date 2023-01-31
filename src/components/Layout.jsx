import React from 'react';
import { useSelector } from 'react-redux';
import Chat from './Chat';
import Login from './Login';
import cn from 'classnames';
import useTheme from '../hooks/useTheme';
import Header from './Header';
import { Outlet } from 'react-router-dom';


function Layout() {
	const { isDark } = useTheme();
	const currentUser = useSelector(state => state.users.currentUser);
	return (
		<div className={cn('wrapper', {
			dark: isDark
		})}>
			<Header />
			<div className='chat'>
				<div className="chat__container">
					{currentUser === null ?
						<Login />
						:
						<Chat />
					}
				</div>
			</div>
			<Outlet />
		</div>
	)
}

export default Layout;