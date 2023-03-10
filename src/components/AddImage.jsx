import { nanoid } from 'nanoid';
import React from 'react';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addMessage } from '../features/messages/messagesSlice';

function AddImage({
	setFileHandler,
	preview,
	setPreview,
	currentUser,
	formatter,
	setImage
}) {
	const dispatch = useDispatch();

	const [value, setValue] = useState('');
	const removeHandler = index => {
		setPreview(preview.filter((item, pos) => pos !== index))
	}
	const images = preview.reverse().map((item, index) => (
		<div key={index} className="add-image__image">
			<img src={item} alt='Preview pic' />
			<div className="add-image__operations">
				<div
					className="add-image__operation add-image__operation_remove"
					onClick={() => removeHandler(index)}
				>
					<FaTrash />
				</div>
			</div>
		</div>
	))


	const cancelHandler = () => {
		setPreview([]);
		setImage([]);
	}

	const submitHandler = () => {
		dispatch(addMessage({
			id: nanoid(),
			user: currentUser,
			data: {
				text: value,
				images: preview
			},
			currentDate: {
				time: formatter.time,
				fullDate: formatter.fullDate,
			}
		}));
		cancelHandler()
	}

	return (
		<div className="add-image">
			<div className="add-image__wrapper">
				<div className="add-image__title">
					{preview.length === 0 ?
						<>Send the image</> :
						<>Choosed {preview.length} images</>
					}
				</div>
				<div className="add-image__images">
					{images}
				</div>
				<div className="add-image__input">
					<div className="add-image__text">Signature</div>
					<input
						type="text"
						value={value}
						className="add-image__textinput"
						name='add-image__textinput'
						onChange={event => setValue(event.target.value)}
						autoFocus
					/>
				</div>
				<div className="add-image__actions add-image-actions">
					<div className="add-image-actions__item add-image-actions__item_add">
						<input
							type='file'
							onChange={setFileHandler}
							id='input-file'
							accept='image/*'
							multiple
						/>
						<label htmlFor="input-file" className="add-image-actions__label">
							Add
						</label>
					</div>
					<div className="add-image-actions__category">
						<div
							className="add-image-actions__item add-image-actions__item_cancel"
							onClick={cancelHandler}
						>
							Cancel
						</div>
						<div
							className="add-image-actions__item add-image-actions__item_send"
							onClick={submitHandler}
						>
							Send
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddImage;