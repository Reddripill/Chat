import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.scss';
import { ThemeProvider } from './providers/ThemeProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
