import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    ticketList: []
};

export const getAllTicketsForUser = createAsyncThunk("tickets/getAllTicketsForTheUser", async () => {
    try {
        const response = axiosInstance.get("getMyAssignedTickets",{
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response,{
            success: "Successfully loaded all the tickets",
            loading: 'Loading tickets',
            error: 'Something Went Wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
        // toast.error("Something went wrong");
    }
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsForUser.fulfilled,(state,action) => {
            if(!action.payload?.data) return;
            state.ticketList = action.payload?.data?.result;
        });
    }
});


export default ticketSlice.reducer;