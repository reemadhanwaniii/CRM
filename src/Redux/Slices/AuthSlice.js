import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";


const initialState = {
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || undefined,
    token: localStorage.getItem('token') || {},
    isLoggedIn: localStorage.getItem('isLoggedIn') || false
};


export const login = createAsyncThunk('/auth/login', async (data)=> {
    try {
       const response = await axiosInstance.post("auth/signin",data);
       return response;
    } catch (error) {
        console.log(error);
    }
});

export const signup = createAsyncThunk('/auth/signup', async (data)=> {
    try {
       const response = await axiosInstance.post("auth/signup",data);
       return response;
    } catch (error) {
        console.log(error);
    }
});



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            console.log(action);
            if(!action.payload) return;
            state.isLoggedIn = (action.payload?.data?.token !== undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem('role',action.payload?.data?.userData?.userType);
            localStorage.setItem('token',action.payload?.data?.token);
            localStorage.setItem('data',JSON.stringify(action.payload?.data?.userData));
            localStorage.setItem('isLoggedIn',(action.payload?.data?.token !== undefined));
        });
        // .addCase(login.rejected,()=>{

        // })
    }
});


export default authSlice.reducer;