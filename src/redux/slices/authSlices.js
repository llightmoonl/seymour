import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params, {rejectWithValue}) => {
    try{
        const {data} = await axios.post('/auth/login', params);
    
        return data;
    }
    catch(err){
        return rejectWithValue(err.response.data.message);
    }
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, {rejectWithValue}) => {
    try{
        const {data} = await axios.post('/auth/register', params);
    
        return data;
    }
    catch(err){
        return rejectWithValue(err.response.data.message);
    }
})

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async()=>{
    const {data} = await axios.get('/auth/profile');
    
    return data;
})

const initialState = {
    data: null,
    status: 'loading',
    error: {}
}

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status= 'loading';
            state.data = null;
            state.error = {};
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.status= 'loaded';
            state.data = action.payload;
            state.error = {};
        })
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.status= 'error';
            state.data = null;
            state.error = action.payload;
        })
        builder.addCase(fetchRegister.pending, (state) => {
            state.status= 'loading';
            state.data = null;
            state.error = {};
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status= 'loaded';
            state.data = action.payload;
            state.error = {};
        })
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.status= 'error';
            state.data = null;
            state.error = action.payload;
        })
        builder.addCase(fetchProfile.pending, (state) => {
            state.status= 'loading';
            state.data = null;
            state.error = {};
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.status= 'loaded';
            state.data = action.payload;
            state.error = {};
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.status= 'error';
            state.data = null;
            state.error = action.payload;
        })
    }
})

export const isAuthUser = (state) => Boolean(state.auth.data);
export const {logout} = authSlices.actions;
export const authReducer = authSlices.reducer;
