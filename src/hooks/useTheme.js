import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider';

function useTheme() {
	const value = useContext(ThemeContext);
	return value;
}

export default useTheme;