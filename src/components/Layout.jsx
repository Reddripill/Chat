import React from 'react';
import { useSelector } from 'react-redux';
import Chat from './Chat';
import Login from './Login';


function Layout() {
	const currentUser = useSelector(state => state.users.currentUser);
	return (
		<div className="chat">
			<div className="chat__container">
				{currentUser === null ?
					<Login />
					:
					<Chat />
				}
			</div>
		</div>
	)
}

export default Layout;