import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FullscreenImage from './components/FullscreenImage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='image/:imageId' element={<FullscreenImage />} />
			</Route>
		</Routes>
	);
}

export default App;
