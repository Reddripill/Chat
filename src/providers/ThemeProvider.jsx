import { createContext, useMemo, useState } from "react";

const initIsDark = JSON.parse(window.localStorage.getItem('isDark'));

export const ThemeContext = createContext({ isDark: true });

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(initIsDark);

	const value = useMemo(() => ({ isDark, setIsDark }), [isDark]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	)
}