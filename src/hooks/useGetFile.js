import { useEffect, useState } from "react";


function useGetFile() {
	const [image, setImage] = useState();
	const [preview, setPreview] = useState([]);
	useEffect(() => {
		if (image) {
			const promises = image.map(item => {
				return new Promise(resolve => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						resolve(reader.result);
					}
				})
			})
			Promise
				.all(promises)
				.then(images => {
					setPreview(prev => {
						return prev.concat(images).filter((item, position, arr) => {
							return arr.indexOf(item) === position
						}).reverse()
					})
				})
		}
	}, [image])

	const setFileHandler = event => {
		setImage(Array.from(event.target.files));
	}
	return { setFileHandler, preview, setPreview, setImage };
}

export default useGetFile;