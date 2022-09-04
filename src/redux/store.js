import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Auth/authSlice';
import todosSlice from "./Todos/todosSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosSlice
    },

});