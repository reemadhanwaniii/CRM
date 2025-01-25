import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getAllTicketsForUser } from "../Redux/Slices/TicketSlice";


function useTickets() {

    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    async function loadTickets() {
            const response = dispatch(getAllTicketsForUser());
            console.log(response);
    }

    useEffect(()=>{
        if(ticketState.ticketList.length === 0) {
            loadTickets();
        }
    },[authState.token]);

    return [ticketState];

}

export default useTickets;