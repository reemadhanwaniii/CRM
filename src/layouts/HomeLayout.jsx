import { useEffect } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {

    const authState = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logout());
        navigate('/login');
    }

    useEffect(()=>{
        if(!authState.isLoggedIn) navigate('/login');
    },[]);

    return(
        <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer">
                    <BsFillMenuButtonWideFill 
                        size={'32px'}
                        className="cursor-pointer"
                    />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {authState.role === "admin" && <li><Link to="/users">All Users</Link></li>}
                <li className="absolute bottom-8 ">
                    <div className="w-full flex items-center justify-center gap-16">
                        {
                            !authState.isLoggedIn ? (
                                <>
                                    <Link to="/login"><button className="btn btn-active btn-primary px-4 py-1 rounded-md font-semibold">Login</button></Link>
                                    <Link to="/signup"><button className="btn btn-active btn-secondary px-4 py-1 rounded-md font-semibold">Signup</button></Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={onLogout} className="btn btn-active btn-primary px-4 py-1 rounded-md font-semibold">Logout</button>
                                    <Link><button className="btn btn-active btn-secondary px-4 py-1 rounded-md font-semibold">Profile</button></Link>
                                </>
                            )
                        }
                        
                    </div>
                </li>
                </ul>
            </div>
        </div>

        <div className="flex items-start justify-center">
            <div className="w-3/4">
                 {children}
            </div>
        </div>
        
    </div>
    );
}

export default HomeLayout;