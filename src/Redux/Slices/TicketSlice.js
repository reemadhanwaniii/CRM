import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    ticketList: [],
    ticketDistribution: {
        open: 0,
        inProgress: 0,
        onHold: 0,
        cancelled: 0,
        resolved: 0
    },
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
            const tickets = action.payload?.data?.result;
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            tickets.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            });
        });
    }
});


export default ticketSlice.reducer;