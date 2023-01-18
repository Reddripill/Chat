import React from 'react'

function AddImage({ setFileHandler, preview, setPreview }) {
	const images = preview.map((item, index) => (
		<div key={index} className="add-image__image">
			<img src={item} alt='Preview pic' />
		</div>
	))

	const cancelHandler = () => {
		setPreview([]);
	}
	return (
		<div className="add-image">
			<div className="add-image__wrapper">
				<div className="add-image__title">Send the image</div>
				<div className="add-image__images">
					{images}
				</div>
				<div className="add-image__input">
					<div className="add-image__text">Signature</div>
					<input
						type="text"
						className="add-image__textinput"
						name='add-image__textinput'
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
							onClick={cancelHandler}
						>
							Send
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default AddImage;