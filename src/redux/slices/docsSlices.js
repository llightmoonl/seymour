import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchDoc = createAsyncThunk('docs/fetchDoc', async (url, thunkAPI) => {
    const {data} = await axios.get(url ? `/docs/${url}` : '/docs/start');
    
    return data;
})

export const fetchDocDelete = createAsyncThunk('docs/fetchDocDelete', async (url, thunkAPI) => {
    const {data} = await axios.delete(`/docs/${url}`);

    return data;
})

export const fetchCategories = createAsyncThunk('docs/fetchCategories', async () => {
    const {data} = await axios.get('/docs/categories');
    
    return data;
})

const initialState = {
    docs: {
        items: [],
        status: "loading"
    },
    categories: {
        items: [],
        status: "loading"
    },
    error: {
        items: [],
    }
};

export const docsSlices = createSlice({
    name: 'docs', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDoc.pending, (state) => {
            state.docs.status = 'loading';
        })
        builder.addCase(fetchDoc.fulfilled, (state, action) => {
            state.docs.items = action.payload;
            state.docs.status = 'loaded';
        })
        builder.addCase(fetchDoc.rejected, (state) => {
            state.docs.items = [];
            state.docs.status = 'error';
        })
        builder.addCase(fetchCategories.pending, (state) => {
            state.categories.status = 'loading';
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories.items = action.payload;
            state.categories.status = 'loaded';
        })
        builder.addCase(fetchCategories.rejected, (state) => {
            state.docs.items = [];
            state.docs.status = 'error';
        })
        builder.addCase(fetchDocDelete.pending, (state) => {
            state.docs.status = 'loading';
        })
        builder.addCase(fetchDocDelete.fulfilled, (state) => {
            window.location.reload();
            state.docs.status = 'loaded';
        })
        builder.addCase(fetchDocDelete.rejected, (state) => {
            state.docs.status = 'error';
        })
    }
})

export const docsReducer = docsSlices.reducer;