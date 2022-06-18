import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import listsService from './listsService';

const initialState = {
    lists: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

/**
 *   FETCH LISTS FUNCTION.
 */

export const fetchLists = createAsyncThunk(
    'lists/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.fetchLists(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 *    ADD LIST
 */

export const addList = createAsyncThunk(
    'lists/addList',
    async (name, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.addList(name, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 *   ADD ITEM TO LIST
 */

export const addItem = createAsyncThunk(
    'lists/addItem/id',
    async (listId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.addItem(listId, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 *   DELETE LIST
 */

export const removeList = createAsyncThunk(
    'lists/remove/id',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.removeList(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.date &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 *  DELETE ITEM
 */

export const removeItem = createAsyncThunk(
    'lists/remove/id/item/id',
    async (obj, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.removeItem(obj, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.date &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 * EDIT LIST
 */

export const editList = createAsyncThunk(
    'lists/edit/id',
    async (obj, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await listsService.editList(obj, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.message) ||
                error.message ||
                error.toString();

            thunkAPI.rejectWithValue(message);
        }
    }
);

/**
 *  CREATE LISTS SLICE, REDUCERS AND EXTRA REDUCERS..
 */

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        listReset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists.push(action.payload);
            })
            .addCase(addList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists = state.lists.map((list) =>
                    list._id === action.payload._id ? action.payload : list
                );
            })
            .addCase(addItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists = state.lists.filter(
                    (list) => list._id !== action.payload._id
                );
            })
            .addCase(removeList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists = state.lists.map((list) =>
                    list._id === action.payload._id ? action.payload : list
                );
            })
            .addCase(removeItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.lists = state.lists.map((list) =>
                    list._id === action.payload._id ? action.payload : list
                );
            })
            .addCase(editList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { listReset } = listsSlice.actions;
export default listsSlice.reducer;
