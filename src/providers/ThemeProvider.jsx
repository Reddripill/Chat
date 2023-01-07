import { createContext, useMemo, useState } from "react";

const initIsDark = JSON.parse(window.localStorage.getItem('isDark'));
console.log(initIsDark);

export const ThemeContext = createContext({ isDark: false });

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(initIsDark || false);

	const value = useMemo(() => ({ isDark, setIsDark }), [isDark]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	)
}