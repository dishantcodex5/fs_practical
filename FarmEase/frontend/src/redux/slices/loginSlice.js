import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    cartCount: 0
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.cartCount = action.payload.cartCount || 0;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.cartCount = 0;
        },
        updateCartCount: (state, action) => {
            state.cartCount = action.payload;
        }
    }
});

export const { setUser, logout, updateCartCount } = loginSlice.actions;
export default loginSlice.reducer; 