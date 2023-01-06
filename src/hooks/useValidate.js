import classNames from "classnames";
import { useEffect, useState } from "react";


function useValidation(value, validations) {
	const [error, setError] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);
	const [minLength, setMinLength] = useState(false);
	useEffect(() => {
		for (let validation in validations) {
			switch (validation) {
				case 'isEmpty':
					value ? setIsEmpty(false) : setIsEmpty(true);
					break;
				case 'minLength':
					value.length <= validations[validation] ? setMinLength(true) : setMinLength(false);
					break;
				default:
					setError(false)
					break;
			}
		}
	}, [value, validations])
	useEffect(() => {
		if (isEmpty || minLength) {
			setError(true)
		} else {
			setError(false);
		}
	}, [isEmpty, minLength]);
	return {
		error,
		isEmpty,
		minLength
	}
}


function useInput(initialValue, initialClass, validations) {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setIsDirty] = useState(false);
	const [classname, setClassname] = useState(initialClass);
	const validate = useValidation(value, validations)

	const changeHandler = event => setValue(event.target.value);

	const blurHandler = () => {
		setIsDirty(true);
	}

	useEffect(() => {
		setClassname(classNames(initialClass, {
			unvalidate: isDirty && validate.error
		}))
	}, [initialClass, isDirty, validate.error])

	return {
		value,
		isDirty,
		changeHandler,
		blurHandler,
		classname,
		...validate
	}
}


export default useInput;