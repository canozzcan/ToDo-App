import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: 'Can'
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.user = '';
            localStorage.removeItem('user');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;