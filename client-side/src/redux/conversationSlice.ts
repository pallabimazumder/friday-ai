import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation } from "../type/Conversation";

type ConversationState = {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
};

const initialState: ConversationState = {
    conversations: [],
    selectedConversation: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversation(state, action: PayloadAction<Conversation[]>) {
            state.conversations = action.payload;
        },
        addConversation(state, action: PayloadAction<Conversation>) {
            state.conversations.unshift(action.payload);
        },
        clearConversation(state) {
            state.conversations = [];
        },
        setSelectedConversation(state, action: PayloadAction<Conversation | null>) {
            state.selectedConversation = action.payload;
        }
    },
});

export const { setConversation, addConversation, clearConversation, setSelectedConversation } = conversationSlice.actions;

export default conversationSlice.reducer;