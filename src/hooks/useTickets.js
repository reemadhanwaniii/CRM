import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllTicketsForUser,resetTicketList } from "../Redux/Slices/TicketSlice";



function useTickets() {

    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    async function loadTickets() {
            if(ticketState.ticketList.length === 0){
                const response = await dispatch(getAllTicketsForUser());
                console.log(response);
            }
            if(searchParams.get("status")) {
                dispatch(filterTickets({status: searchParams.get("status")}));
            } else{
                dispatch(resetTicketList());
            }
    }

    useEffect(()=>{
            loadTickets();
    },[authState.token],searchParams.get("status"));

    return [ticketState];

}

export default useTickets;