import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../type/User";

type ThemeMode = 'light' | 'dark';

type UserState = {
    userData: typeof User | null;
    theme: ThemeMode;
};

const getStoredTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = window.localStorage.getItem('friday-theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        theme: getStoredTheme(),
    } as UserState,
    reducers: {
        setUserData(state, action: PayloadAction<typeof User>) {
            state.userData = action.payload;
        },
        clearUserData(state) {
            state.userData = null;
        },
        setTheme(state, action: PayloadAction<ThemeMode>) {
            state.theme = action.payload;
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('friday-theme', action.payload);
            }
        },
    },
});

export const { setUserData, clearUserData, setTheme } = userSlice.actions;

export default userSlice.reducer;