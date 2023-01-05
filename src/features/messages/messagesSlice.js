import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage(state, action) {
			messagesAdapter.setOne(state, action.payload)
		}
	}
})

export const { addMessage } = messagesSlice.actions;

export const { selectEntities: allMessages } = messagesAdapter.getSelectors(state => state.messages);

export default messagesSlice.reducer;