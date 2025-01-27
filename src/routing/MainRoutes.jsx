import { Route,Routes } from "react-router-dom";

import Login from "../pages/auth/login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/home/Dashboard";
import Home from "../pages/home/Home";
import ListAllUsers from "../pages/users/ListAllUsers";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Home/>}/>
            <Route element={<AuthRoutes allowListedRoles={["admin"]} />}>
                <Route path="/users" element={<ListAllUsers />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default MainRoutes;