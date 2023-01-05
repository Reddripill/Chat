import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapder = createEntityAdapter();

const initialState = usersAdapder.getInitialState({
	currentUser: null,
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		login(state, action) {
			const inputedUser = action.payload.user;
			const existingUser = Object.values(state.entities).find(item => item.user === inputedUser);
			if (existingUser) {
				state.currentUser = existingUser.user;
			} else {
				state.currentUser = inputedUser;
			}
		},
		logout(state) {
			state.currentUser = null;
		}
	}
})

export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;