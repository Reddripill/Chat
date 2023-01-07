import React, { useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../hooks/useTheme';
import cn from 'classnames';

function Header() {
	const { isDark, setIsDark } = useTheme();

	useEffect(() => {
		window.localStorage.setItem('isDark', JSON.stringify(isDark))
	}, [isDark])
	return (
		<header className="header">
			<div
				className={cn("btn-change-theme", {
					dark: isDark
				})}
				onClick={() => setIsDark(!isDark)}>
				{isDark ?
					<FiSun /> :
					<FiMoon />
				}
			</div>
		</header >
	)
}

export default Header;