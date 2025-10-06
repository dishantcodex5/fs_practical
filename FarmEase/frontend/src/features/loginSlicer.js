import { createSlice } from "@reduxjs/toolkit"

const loginSlicer = createSlice({
    name: "login",
    initialState: {
        isLogin: false,
        user: null,
        cartCount: 0
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
            // Initialize cart count from user data if available
            state.cartCount = action.payload.cartCount || 0;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
            state.cartCount = 0;
        },
        updateCartCount: (state, action) => {
            state.cartCount = action.payload;
        }
    }
})

export const {login, logout, updateCartCount} = loginSlicer.actions
export default loginSlicer.reducer