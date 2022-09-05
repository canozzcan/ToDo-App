import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
})

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
})

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync', async ({ id, data }) => {
    const res = await axios.put(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data)
    return res.data;
})


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        addNewTodoIsLoading: false,
        addNewTodoError: null
    },
    reducers: {},
    extraReducers: {
        // Get ToDo's
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        // Add ToDo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodoIsLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoIsLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoIsLoading = false;
            state.addNewTodoError = action.error.message;
        },

        // Toggle ToDo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, isCompleted } = action.payload;
            const index = state.items.findIndex(item => item.id === id);
            state.items[index].isCompleted = isCompleted;
        },

        // Remove ToDo
        [removeTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1);
        },

        // Edit Todo
        [editTodoAsync.fulfilled]: (state, action) => {
            const { takeId, content } = action.payload;
            const index = state.items.findIndex((item) => item.id === takeId);
            state.items[index].content = content;  
        }
    }
});

export const selectTodos = state => state.todos.items;


export default todosSlice.reducer;