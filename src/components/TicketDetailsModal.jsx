import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateTicket } from "../Redux/Slices/TicketSlice";


function TicketDetailsModal({ticket}) {

    const [currentTicket,setCurrentTicket] = useState(ticket);
    const dispatch = useDispatch();

    function handleTicketChange(e) {
        const { name, value} = e.target;
        setCurrentTicket({
            ...currentTicket,
            [name] : value
        });
    }


    async function handleFormSubmit() {
        const response = await dispatch(updateTicket(currentTicket));
        console.log(response);
        const modal = document.getElementById('ticket_modal');
        modal.close();
    }

    return(
        <dialog id="ticket_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <textarea 
                    name="description" 
                    cols="50" 
                    rows="7" 
                    value={currentTicket.description} 
                    className="bg-white text-black my-2 rounded-lg resize-none p-2 w-full"
                    onChange={handleTicketChange}
                >

                </textarea>
                <h1 className="text-lg text-white">Priority : 
                    <select name="ticketPriority" className="p-1 mx-2 bg-white text-black" onChange={handleTicketChange}>
                        <option value="1" selected={currentTicket.ticketPriority === 1}>1</option>
                        <option value="2" selected={currentTicket.ticketPriority === 2}>2</option>
                        <option value="3" selected={currentTicket.ticketPriority === 3}>3</option>
                        <option value="4" selected={currentTicket.ticketPriority >= 4}>4</option>
                    </select>
                </h1>

                <h1 className="text-lg text-white my-4"> Status : 
                    <select name="status" className="p-1 mx-2 bg-white text-black" onChange={handleTicketChange}>
                        <option value="open" selected={currentTicket.status === "open"}>open</option>
                        <option value="resolved" selected={currentTicket.status === "resolved"}>resolved</option>
                        <option value="inProgress" selected={currentTicket.status === "inProgress"}>inProgress</option>
                        <option value="onHold" selected={currentTicket.status === "onHold"}>onHold</option>
                        <option value="cancelled" selected={currentTicket.status === "cancelled"}>cancelled</option>
                    </select>
                </h1>
                <div className="modal-action">
                    <button 
                        onClick={handleFormSubmit}
                        className="btn btn-success hover:bg-green-400 transition-all ease-in-out duration-300 px-4 py-2 rounded-md font-semibold text-lg"
                    >
                        Update Ticket
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                    {/* if there is a button in form, it will close the modal */}
                    <button>Close</button>
            </form>
        </dialog>
    );
}

export default TicketDetailsModal;