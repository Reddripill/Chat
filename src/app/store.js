import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import storage from 'redux-persist/lib/storage';
import usersReducer from '../features/users/usersSlice';
import messagesReducer from '../features/messages/messagesSlice';

const LOGIN = 'users/login';
const LOGOUT = 'users/logout';

const rootReducer = combineReducers({
	users: usersReducer,
	messages: messagesReducer,
})

const persistConfig = {
	key: 'root',
	storage,
}

const config = {
	blacklist: ['TOGGLE_TODO', PERSIST, REHYDRATE, LOGIN, LOGOUT],
	broadcastChannelOption: { type: 'localstorage' },
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(createStateSyncMiddleware(config))
});

export const persistor = persistStore(store);

initMessageListener(store);

export default store;