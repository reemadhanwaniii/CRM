import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllTicketsForUser } from "../../Redux/Slices/TicketSlice";

function Home() {

    const authState = useSelector((state) => state.auth);
    const ticketsState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    async function loadTickets() {
        const response = dispatch(getAllTicketsForUser());
        console.log(response);
    }


    useEffect(()=>{
        loadTickets();
    },[authState.token]);

    return(
       <HomeLayout>
        <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
            <Card>
                <BsFillPencilFill className="inline mr-2" />
            </Card>
            <Card background="bg-yellow-300" borderColor="border-green-400" fontColor="text-black" dividerColor="bg-black">
                <BsFillPencilFill className="inline mr-2" />
            </Card>
        </div>
       </HomeLayout>
    );
}

export default Home;