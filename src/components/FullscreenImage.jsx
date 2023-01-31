import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { messageById } from '../features/messages/messagesSlice';

function FullscreenImage() {
	const { imageId } = useParams();
	const messageId = imageId.slice(0, imageId.length - 1);
	const arrIndex = imageId.slice(-1);
	const message = useSelector(state => messageById(state, messageId));
	const image = message.data.images[arrIndex];
	return (
		<div className="fullscreen">
			<Link to='/' className="fullscreen__close"></Link>
			<img src={image} alt="Fullscreen Pic" className="fullscreen__image" />
		</div>
	)
}

export default FullscreenImage;