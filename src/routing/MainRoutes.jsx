import { Route,Routes } from "react-router-dom";

import Login from "../pages/auth/login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/home/Home";

function MainRoutes() {
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    );
}

export default MainRoutes;