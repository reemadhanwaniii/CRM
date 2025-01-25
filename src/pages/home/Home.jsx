import { BsFillPencilFill } from "react-icons/bs";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";

function Home() {
    return(
       <HomeLayout>
            <Card>
                <BsFillPencilFill className="inline mr-2" />
            </Card>
            <Card background="bg-yellow-300" borderColor="border-green-400" fontColor="text-black" dividerColor="bg-black">
                <BsFillPencilFill className="inline mr-2" />
            </Card>
       </HomeLayout>
    );
}

export default Home;