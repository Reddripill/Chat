import { useEffect, useState } from "react";


function useGetFile() {
	const [image, setImage] = useState([]);
	const [preview, setPreview] = useState([]);
	console.log(preview);
	useEffect(() => {
		if (image) {
			image.forEach(item => {
				const reader = new FileReader();
				reader.readAsDataURL(item);
				reader.onload = () => {
					setPreview(p => (
						!p.includes(reader.result) ? p.push(reader.result) : p
					));
				}
			})
		}
	}, [image])

	const setFileHandler = event => {
		setImage(Array.from(event.target.files));
	}
	return { setFileHandler, preview, setPreview };
}

export default useGetFile;